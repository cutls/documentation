---
title: ソースからインストール
description: Mastodonを立ち上げるためのガイド。
menu:
  docs:
    weight: 20
    parent: admin
---

## 前提 {#pre-requisites}

- rootアクセスのある**Ubuntu 18.04**マシン
- Mastodonサーバーに使う**ドメイン**(サブドメインも可): `example.com`など
- メール配送サービスや**SMTPサーバー**

rootでコマンドを実行します。rootでないなら、以下を実行します。

```sh
sudo -i
```

### システムリポジトリ {#system-repositories}

curlをインストール

```sh
apt install -y curl
```

#### Node.js {#node-js}

```bash
curl -sL https://deb.nodesource.com/setup_10.x | bash -
```

#### Yarn {#yarn}

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
```

### システムパッケージ {#system-packages}

```bash
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot python-certbot-nginx yarn libidn11-dev libicu-dev libjemalloc-dev
```

### Rubyのインストール {#installing-ruby}

rbenvを使用してRubyのバージョンを管理します。これは、適切なバージョンを使用でき、新しいリリースがリリースされたらすぐに更新できるためです。rbenvは単一のLinuxユーザー用にインストールする必要があるため、最初にMastodonを実行するユーザーを作成する必要があります。

```bash
adduser --disabled-login mastodon
```

ユーザーを変更します

```bash
su - mastodon
```

And proceed to install rbenv and rbenv-build:

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

O
インストール後に特定のRubyをインストールするには

```sh
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.6.5
rbenv global 2.6.5
```

規定のgemバージョンはruby_2.6.0となっていて最新のbundlerには対応していません。よってgemをアップデートします。

```
gem update --system
```

bundlerをインストール

```sh
gem install bundler --no-document
```

rootに戻る

```sh
exit
```

## セットアップ {#setup}

### PostgreSQLをセットアップ {#setting-up-postgresql}

#### パフォーマンスチューニング \(任意\) {#performance-configuration-optional}

最適なパフォーマンスを得るために、[pgTune](https://pgtune.leopard.in.ua/#/)で設定ファイルを生成し、 `/etc/postgresql/9.6/main/postgresql.conf`を`systemctl restart postgresql`で再起動する前に編集します。

#### ユーザー作成 {#creating-a-user}

Mastodonが使用できるPostgreSQLユーザーを作成する必要があります。単純な設定で「ident」認証を使用するのが最も簡単です。つまり、PostgreSQLユーザーは個別のパスワードを持たず、同じユーザー名のLinuxユーザーが使用できます。

プロンプトを開きます

```sh
sudo -u postgres psql
```

In the prompt, execute:

```
CREATE USER mastodon CREATEDB;
\q
```

完了です！

### Mastodonのセットアップ {#setting-up-mastodon}

mastodonユーザーに切り替えましょう。ついにMastodonの本体をインストールです。

```sh
su - mastodon
```

#### チェックアウト {#checking-out-the-code}

最終安定版に切り替えます。

```sh
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### 最新の依存関係のインストール {#installing-the-last-dependencies}

RubyとNode.jsの依存関係をインストールします。

```bash
bundle install \
  -j$(getconf _NPROCESSORS_ONLN) \
  --deployment --without development test
yarn install --pure-lockfile
```

#### 設定ファイルを作成 {#generating-a-configuration}

インタラクティブな設定ウィザードを使用できます。

```sh
RAILS_ENV=production bundle exec rake mastodon:setup
```

できること

- 設定ファイルの作成
- アセットのプリコンパイル
- データベースのスキーマの作成

設定ファイルは`.env.production`に保存されます。好きなように編集してください。[documentation on configuration]({{< relref "config.md" >}})も参照。

rootに戻ります。

```sh
exit
```

### Nginxの設定 {#setting-up-nginx}

MastodonのディレクトリからNginxの設定ファイル例をコピーします。

```sh
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

そして、`/etc/nginx/sites-available/mastodon`を開いて`example.com`を自分のドメイン名に変更するなど、任意の設定をしてください。

Nginxの設定を再読込します。

```sh
systemctl reload nginx
```

### SSL証明書の取得{#acquiring-a-ssl-certificate}

無料のLet's Encrypt証明書を使用します。

```bash
certbot --nginx -d example.com
```

これにより、証明書が取得されます。そして、`/etc/nginx/sites-available/mastodon`は新しい証明書を使用するように自動的に更新され、nginxがリロードされて変更が有効になります。

この時点で、ブラウザーでドメインにアクセスし、象がコンピューター画面のエラーページにヒットするのを確認できるはずです。これは、マストドンのプロセスをまだ開始していないためです。

### systemdサービスを作成 {#setting-up-systemd-services}

systemdサービステンプレートをMastodonディレクトリからコピーします。

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

次に、ファイルを編集して、ユーザー名とパスが正しいことを確認します。

- `/etc/systemd/system/mastodon-web.service`
- `/etc/systemd/system/mastodon-sidekiq.service`
- `/etc/systemd/system/mastodon-streaming.service`

最後に、新しいsystemdサービスを開始して有効にします。

```sh
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```

マシンの起動時にも自動で起動します。

{{< hint style="success" >}}
**お疲れ様です！ブラウザであなたのMastodonにアクセスできるはずです！**
{{< /hint >}}

