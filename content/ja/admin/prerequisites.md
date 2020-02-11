---
title: マシンの準備
menu:
  docs:
    weight: 10
    parent: admin
---

もし完全に新しい環境(OS)でセットアップする場合、まずセキュリティを強化するべきです。**Ubuntu 18.04**での例を紹介します。

## SSHにパスワードでログインできないようにします (keyを使用)

まずサーバーにパスワードではなくkeyでログインするようにします。これは締め出される可能性を低くするためのものです。多くのホスティングサービスは公開鍵(public key)をアップロードしたり、新規マシンを作成時に最初からkeyを使ったログインに対応しています。

 `/etc/ssh/sshd_config`の`PasswordAuthentication`を編集します。コメントアウトを解除して`no`になるように設定します。そしてsshdを再起動します。

```sh
systemctl restart ssh
```

### パッケージを更新

```sh
apt update && apt upgrade -y
```

### 繰り返しのログイン試行を防ぐ

`fail2ban`を使用

```sh
apt install fail2ban
```

`/etc/fail2ban/jail.local`の内部に

```ini
[DEFAULT]
destemail = your@email.here
sendername = Fail2Ban

[sshd]
enabled = true
port = 22

[sshd-ddos]
enabled = true
port = 22
```

と書いてfail2banを再起動します。

```sh
systemctl restart fail2ban
```

### SSHとHTTP, HTTPSだけポート開放するようファイアウォールを設定

まずiptables-persistentを入れます。インストール中に現在の設定を保持するか聞かれます。

```sh
apt install -y iptables-persistent
```

`/etc/iptables/rules.v4`の内部に

```
*filter

#  Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

#  Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  Allow SSH connections
#  The -dport number should be the same port number you set in sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#  Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Reject all other inbound - default deny unless explicitly allowed policy
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

と書きます。
iptables-persistentを使用すると、その構成は起動時に読み込まれます。ただし、最初は手動で読み込む必要があります。

```sh
iptables-restore < /etc/iptables/rules.v4
```
