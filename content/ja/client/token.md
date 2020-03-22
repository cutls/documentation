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

Now that we have an application, let's obtain an access token that will authenticate our requests as that client application. To do so, use [POST /oauth/token](../methods/apps/oauth.md#obtain-a-token) like so:

```bash
curl -X POST \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'grant_type=client_credentials' \
	https://mastodon.example/oauth/token
```

Note the following:

* `client_id` and `client_secret` were provided in the response text when you registered your application.
* `redirect_uri` must be one of the URIs defined when registering the application.
* We are requesting a `grant_type` of `client_credentials`, which defaults to giving us the `read` scope.

The response of this method is a [Token]({{< relref "../entities/token.md" >}}) entity. We will need the `access_token` value. Once you have the access token, save it in your local cache. To use it in requests, add the HTTP header `Authorization: Bearer ...` to any API call that requires OAuth \(i.e., one that is not publicly accessible\). Let's verify that our obtained credentials are working by calling [GET /api/v1/apps/verify\_credentials](../methods/apps/#verify-your-app-works):

```bash
curl \
	-H 'Authorization: Bearer our_access_token_here' \
	https://mastodon.example/api/v1/apps/verify_credentials
```

If we've obtained our token and formatted our request correctly, we should see our details returned to us as an [Application]({{< relref "../entities/application.md" >}}) entity.

## What we can do with authentication {#methods}

With our authenticated client application, we can view relations of an account with [GET /api/v1/accounts/:id/following](../methods/accounts/#following) and [GET /api/v1/accounts/:id/followers](../methods/accounts/#followers). Also, some instances may require authentication for methods that would otherwise be public, so if you encountered any authentication errors while playing around with public methods, then those methods should now work.

