---
title: サーバのバックアップ
description: 日常的にバックアップを取る方法。(任意という名の強制)
menu:
  docs:
    weight: 80
    parent: admin
---

現実問題として、Mastodonサーバーを日常的に、かつ確実にバックアップを取らないといけません。

## 概要 {#overview}

バックアップすべきものを重要度順に並べています。

1. PostgreSQLデータベース
2. `.env.production`等の機密ファイル
3. ユーザーがアップロードしたファイル
4. Redisデータベース

### 「失敗」と「その後」

一般に人間が回避することができる障害のタイプは2つあります。

1. ディスク上のデータ破損などのハードウェアの障害特定のデータの不正な削除など
1. 人的およびソフトウェアのエラー

このドキュメントでは、1.のみを扱います。

PostgreSQLのデータベースを失ってしまった場合、もうお手上げ状態です。Mastodonは重要なデータのほぼ全てをPostgreSQLデータベースに保存しています。この場合、全てのアカウントや投稿、フォロワー情報なども失われます。

機密ファイルを失ってしまった場合、一部のMastodonの機能が利用不可になります。ユーザーはログアウトされ、2要素認証は利用できなくなり、Web Push APIは機能しなくなります。

ユーザーがアップロードしたファイルを失うということは、アバター、ヘッダー、メディアの添付ファイルが失われるということですが、Mastodon自体は停止しません。

Redisデータベースを失ってもほとんど無害です。回復不能なデータは、Sidekiqキューの内容と、以前に失敗したジョブのスケジュールされた再試行だけです。ホームフィードとリストフィードはRedisに保存されますが、tootctlを使用して再生成できます。

最適なバックアップは、いわゆるオフサイトバックアップ、つまりMastodon自体と同じマシンに保存されていないバックアップです。ホストされているサーバーのハードディスクドライブが爆発した場合、同じハードドライブに保存されているバックアップはあまり役に立ちません。

### 機密ファイルのバックアップ

アプリケーションの機密ファイルは変更されないため、バックアップが最も簡単です。`.env.production`をどこか安全なところに保存してください。

### PostgreSQLのバックアップ

PostgreSQLは、停電、ハードディスクドライブの障害、スキーマの移行の失敗によるデータ破損の危険にさらされています。そのため、ときどき`pg_dump`または`pg_dumpall`でバックアップを作成することをおすすめします。

高可用性が求められる場合、ホットストリーミングレプリケーションを使用して、常に最新のデータを持つ2番目のPostgreSQLサーバーを用意し、他のサーバーがダウンした場合に切り替えることができます。

### ユーザーがアップロードしたファイルのバックアップ

Amazon S3、Google Cloud、Wasabiなどの外部オブジェクトストレージを使用している場合、これらのバックアップについて心配する必要はありません。各企業は、ハードウェア障害の処理に責任を負っています。
ローカルファイルストレージを使用している場合、アップロードされたファイルはデフォルトで`public/system`に保存されます。この可変ディレクトリのコピーを作成するのはあなた次第です。

### Redisのバックアップ

Redisのバックアップは簡単です。Redisは、`/var/lib/redis/dump.rdb`にバックアップが必要な内容の全てを含んでいます。
