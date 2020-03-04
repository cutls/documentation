---
title: 全文検索
description: Elasticsearchを設定すると、自分の投稿や、自分がお気に入り登録した投稿、メンションされた投稿を検索できます。
menu:
  docs:
    weight: 10
    parent: admin-optional
---

Elasticsearchが有効な場合、Mastodonは全文検索をサポートします。Mastodonの全文検索はログインしているユーザーに、そのユーザーの投稿や、お気に入り登録した投稿、メンションされた投稿を検索できます。データベース全体で任意の文字列を検索することはできません。

## Elasticsearchのインストール {#install}

Elasticsearchを使用するためにはJavaランタイムが必要です。インストールしていない場合は行います。`root`でログインしている場合以下のように実行します。

```bash
apt install openjdk-8-jre-headless
```

aptにElasticsearchの公式リポジトリを登録します。

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-6.x.list
apt update
```

そして、Elasticsearchをインストールします。

```bash
apt install elasticsearch
```

{{< hint style="warning" >}}
**セキュリティ上の警告** 標準では、Elasticsearchはlocalhostだけにバインドできます。つまり、外部ネットワークからはアクセスできないと言うことです。`/etc/elasticsearch/elasticsearch.yml`内の`network.host`でElasticsearchがバインドされているアドレスをチェックできます。ElasticsearchにアクセスできるユーザはElasticsearch内のいかなるデータにもアクセスでき、変更できるということに注意してください。従って、アクセス制御をセキュアな状態に保っておくことは非常に重要です。これは[インストールガイド]()でも推奨されていますが、22, 80, 443ポート以外のポートはファイアウォールで閉じておくことをおすすめします。もしマルチホストでセットアップする場合、内部のトラフィックのセキュリティについて熟知しておく必要があります。
{{< /hint >}}

Elasticsearchの開始:

```bash
systemctl enable elasticsearch
systemctl start elasticsearch
```

## Mastodonの設定 {#config}

以下の変数を`.env.production`に追加してください。

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

もし同じマシンに複数のMastodonサーバが存在する場合、そしてその全てに同一のElasticsearchサービスを使用しようとしている場合、インデックスを区別するために`REDIS_NAMESPACE`の値を各々別のものにしておいてください。もしElasticsearchのインデックスのプレフィクスを上書きしないと行けない場合、`ES_PREFIX`を直接指定することもできます。

新しい設定を保存した後、Elasticsearchにインデックスを作成します。

```bash
RAILS_ENV=production bundle exec rake chewy:upgrade
```

そして、設定を適用するためにMastodonプロセスを再起動します。

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

これで新しい投稿は全てElasticsearchにインデックスされます。最後に、古いデータも同様にインデックスすれば完了です。以下のように実行します。

```bash
RAILS_ENV=production bundle exec rake chewy:sync
```

時間がかかります。

{{< hint style="warning" >}}
**互換性に関する情報** Ruby 2.6.0には上記のタスクが実行できないというバグがあります。2.6.0以外のRubyにそのようなバグはありません。
{{< /hint >}}

