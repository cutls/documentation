---
title: クライアントアプリで認証する
description: 認証と承認の基本
menu:
  docs:
    weight: 30
    parent: client
---

## 認証と承認 {#auth}

これまで、私たちは公開されている情報を扱ってきましたが、すべての情報が公開されているというわけではありません。一部の情報は、その情報を要求しているユーザーを監査する(およびアクセスを取り消すか拒否する可能性がある)ために、表示する前に許可が必要です。

ここで[OAuth]({{< relref "../spec/oauth.md" >}})の出番です。OAuthはアクセストークンを生成するメカニズムです。アクセストークンはリクエストが特定のクライアントからのものであることを _認証(検証)_ し、リクエストされたアクションがサーバーのアクセス制御ポリシーにより _許可(許可）_ されるようにするために使用します。

## アプリケーションの作成 {#app}

まずアプリケーションを登録します。アクセストークンを後に登録できるようにするためです。アプリケーションは以下のようにして作成できます。

```bash
curl -X POST \
	-F 'client_name=Test Application' \
	-F 'redirect_uris=urn:ietf:wg:oauth:2.0:oob' \
	-F 'scopes=read write follow push' \
	-F 'website=https://myapp.example' \
	https://mastodon.example/api/v1/apps
```

上の例において、クライアント名とウェブサイトを指定しています。これは、場合によっては投稿のソースとして開示されます。これらよりも以下のパラメータが重要です。

* `redirect_uris`は「アウトオブバンド」トークン生成として設定されています。これは、生成されたトークンを手動でコピーして貼り付ける必要があるということです。複数のURIを指定できるのでこのパラメータが`redirect_uris`と呼ばれますが、トークンを実際に取得する際にはこのURIのいずれかを提供しなければなりません。
* `scopes`はどのような権限を要求できるかを指定します。後々リクエストするスコープはここで指定したものだけで構成される必要があります。詳しくは[OAuth Scopes](../api/oauth-scopes.md)を見てください。

Applicationエンティティが返ります。しかし、`client_id`と`client_secret`を取得してそれで終わりというわけではありません。これらは後々アクセストークンを生成するときに使用します。よって保存しておいてください。詳しくは[POST /api/v1/apps](../methods/apps/#create-an-application)を見てください。

## 認証コード取得の流れ {#flow}

アプリケーションの作成が終わりました。次にクライアントアプリからアクセスできるようにアクセストークンを取得します。以下のうように[POST /oauth/token](../methods/apps/oauth.md#obtain-a-token)を使用します。

```bash
curl -X POST \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'grant_type=client_credentials' \
	https://mastodon.example/oauth/token
```

注意:

* `client_id`と`client_secret`はアプリケーションを登録した時に取得しています。
* `redirect_uri`はアプリケーションを登録した時に指定したものから1つを選んで使用します。
* `grant_type`は`client_credentials`を使用します。スコープは`read`となります。

レスポンスは[Token]({{< relref "../entities/token.md" >}})エンティティとなります。`access_token`値が必要です。一度アクセストークンを取得したら、ローカルに保存してください。OAuthを要求するAPIへリクエストするためには`Authorization: Bearer our_access_token_here`のように指定してください。[GET /api/v1/apps/verify\_credentials](../methods/apps/#verify-your-app-works)にアクセスすると取得した認証情報を検証できます。

```bash
curl \
	-H 'Authorization: Bearer our_access_token_here' \
	https://mastodon.example/api/v1/apps/verify_credentials
```

もしトークンが正しく取得され、リクエスト形式が正しかった場合、[Application]({{< relref "../entities/application.md" >}})エンティティが返されます。

## 認証情報でできること {#methods}

承認されたクライアントアプリケーションでは、[GET /api/v1/accounts/:id/following](../methods/accounts/#following)や[GET /api/v1/accounts/:id/followers](../methods/accounts/#followers)といったユーザー関係の取得が可能になります。そして。いくつかのインスタンスは公開情報にアクセスするときに認証情報を要求します。もし公開情報取得でエラーに遭遇した場合、認証情報を付けてリクエストし直すと取得できるようになるかもしれません。
