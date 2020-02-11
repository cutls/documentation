---
title: セットアップを完了する
description: Mastodonをインストールした後にやること
menu:
  docs:
    weight: 50
    parent: admin
---

## 管理者アカウントの作成 {#admin}
### ブラウザを使用 {#admin-gui}

ブラウザでサインアップした後、コマンドラインを使用して、新しく作成したアカウントに管理者権限を付与する必要があります。`alice`というユーザーに付与するなら、

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role admin
```

### コマンドラインを使用 {#admin-cli}

コマンドラインでアカウントを作ることもできます。

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role admin
```

ランダムに生成されたパスワードがターミナルに表示されます。

## サーバー情報を書き加える {#info}

ログイン後、**サイト設定**ページに移動します。この情報を入力するための技術的な要件はありませんが、コンピュータというより人間向けの設定と言えます。

|設定|意味|
|-------|-------|
|連絡先ユーザー名 |他の人が管理者だとわかるようにするために必要 |
|ビジネスメールアドレス| アカウントがロックされたり、サーバー外部の人から連絡を受けるために必要 |
|サーバーの説明| サーバーの個性を説明|
|短いサーバーの説明| もっと短い説明 |

「変更の保存」を押して保存します。
