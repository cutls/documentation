---
title: 開発環境のセットアップ
description: Mastodonの開発環境を整える方法。
menu:
  docs:
    weight: 20
    parent: dev
---

{{< hint style="danger" >}}
未完成です。
{{< /hint >}}

### セットアップ {#setup}

プロジェクトディレクトリ(`live`等)で`bundle install`と`yarn install`を実行します。

開発環境では、MastodonはPostgreSQLをその時点で利用しているLinuxユーザーに`ident`メソッドでサインインして利用します。これは通常、そのまま使用できます。`rails db:setup`を実行すれば`mastodon_development`と`mastodon_test`データベースが作成されスキーマがロードされて、`mastodon_development`内の`db/seed.rb`にシード値が作成されます。唯一のシード値は`admin@localhost:3000` / `mastodonadmin`クレデンシャルによるAdminアカウントです。

> **注意** Mastodonはデフォルトで3000ポートを使用します。もし設定を変更して他のポートを使用しているならば、そのポート番号がAdminアカウントにも適用されます。

### 実行 {#running}

Mastodonのプロセスは複数あり、それは各々個別にkillすることもできますが、全て実行されていないとフルセットで実行されません。1コマンドで全て実行したい場合、Foremanを`gem install foreman --no-document`でインストールして、

```text
foreman start
```

をMastodonディレクトリ内で実行してください。`Procfile.dev`内で定義されたプロセスが実行されます。RailsサーバーとWebpackサーバー、ストリーミングAPIサーバー、そしてSidekiqサーバーが起動します。もちろん、必要に応じて、これらのものをスタンドアロンで実行できます。

### テスト {#testing}

| コマンド | 説明 |
| :--- | :--- |
| `rspec` | Rubyのテストスイートを実行 |
| `yarn run test` | JavaScriptのテストスイートを実行 |
| `rubocop` | Rubyコードがコードスタイルに準拠しているかどうかを確認 |

