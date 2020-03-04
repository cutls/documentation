---
title: ログイン
description: ユーザーから承認を取得し、ユーザーに代わってアクションを実行する方法。
menu:
  docs:
    weight: 40
    parent: user
---

## スコープの説明 {#scopes}

アプリケーションを登録し、ユーザーを認証するとき、生成されたトークンに何を許可するかを正確に定義する必要があります。OAuthスコープを使用してこれを実行します。各々のAPIメソッドは関連付けられたスコープが存在し、承認に使用されているトークンが、対応するスコープで生成されている場合にのみ呼び出すことができます。

スコープは登録時に指定したものだけを使用しなければなりません。アプリケーションを作成するとき、`read write follow push`と指定すると、ただ単にすべての使用可能なスコープを要求したということになります。しかし、もっと詳細なスコープを使用して、あなたのアプリが本当に要求している機能だけ要求したほうが良いです。[OAuthスコープ](../api/oauth-scopes.md)で全てのスコープの一覧を見ることができます。各々のAPIメソッドのドキュメントでもそのAPIにアクセスするために必要なスコープを記載しています。

## **認証コードによる認証の一例** {#flow}

これは以前の認証フローに似ていますが、今回はユーザーからも承認を取得する必要があります。

### Client IDとシークレット {#client}

まず、まだクライアントアプリケーションを作成していない場合は、[アプリケーションの作成](token.md#creating-our-application)を見るか、直接[POST /api/v1/apps](../methods/apps/#create-an-application)でこのメソッドのドキュメントを見てください。`client_id`と`client_secret`を使用します。

### ユーザーの認証 {#login}

ユーザーを認証するために、[GET /oauth/authorize](../methods/apps/oauth.md#authorize-a-user)にブラウザでリクエストしてください。その際以下のパラメータが必要です。

```bash
https://mastodon.example/oauth/authorize
?client_id=CLIENT_ID
&scope=read+write+follow+push
&redirect_uri=urn:ietf:wg:oauth:2.0:oob
&response_type=code
```

注意:

* `client_id`と`client_secret`はアプリケーションを登録するときに取得しています。
* `scope`はスコープは登録時に指定したものだけを使用してください。必要なものだけを使用してください。[OAuthスコープ](../api/oauth-scopes.md)で詳細な情報を見ることができます。
* `redirect_uri`はアプリケーション登録時に指定したURIのうちの一つです。この例ではまだ「アウトオブバンド」を使用しています。つまり、取得したコードを手動で入力しないといけないということです。しかし、URIを指定した場合、そのコードは`code`パラメータとして付与され、リクエストハンドラでログに格納されます。詳細は、APIメソッドのドキュメントのレスポンスセクションを見てください。

### トークンの取得 {#token}

今、認証`code`を持っています。リクエストのユーザーを認証するためアクセストークンを取得しましょう。以前と同様[POST /oauth/token](../methods/apps/oauth.md#obtain-a-token)します。違うのは取得した認証`code`を渡すというところだけです。

```bash
curl -X POST \
	-F 'client_id=your_client_id_here' \
	-F 'client_secret=your_client_secret_here' \
	-F 'redirect_uri=urn:ietf:wg:oauth:2.0:oob' \
	-F 'grant_type=authorization_code' \
	-F 'code=user_authzcode_here' \
	-F 'scope=read write follow push' \
	https://mastodon.example/oauth/token
```

注意:

* `client_id`と`client_secret`はアプリケーションを登録したときのレスポンスに含まれています。
* `redirect_uri`はアプリケーション登録時に指定したURIのうちの一つです。
* `grant_type`は`authorization_code`を指定しますが、それでもデフォルトで `read`スコープが与えられます。ただし、ユーザーを認証する際に、特定の`scope`を要求しましたはずです。今回も`scope`に正確に同じ値をここに渡します。
* The `code` can only be used once. If you need to obtain a new token, you will need to have the user authorize again by repeating the above [Authorize the user](authorized.md#authorize-the-user) step.
* `code`は一回限り有効です。もし新しいトークンを必要とする場合、[ユーザーの認証](authorized.md#authorize-the-user)に戻ってやり直す必要があります。

このメソッドのレスポンスは[Token]({{< relref "../entities/token.md" >}})エンティティです。`access_token`を要求します。一度アクセストークンを取得したら、ローカルにキャッシュしてください。アクセストークンをリクエストに含めるには、`Authorization: Bearer アクセストークンを入力` HTTPヘッダーを付与してください。これは、例えば公開されていない情報を取得するときなど、OAuthを要求するいかなるAPIにアクセスする時にも必要です。[GET /api/v1/accounts/verify\_credentials]で取得した認証情報が有効かどうかを確認できます。

```bash
curl \
	-H 'Authorization: Bearer アクセストークンを入力' \
	https://mastodon.example/api/v1/accounts/verify_credentials
```

トークンを正しく取得し、これを含めて上記ののようにアクセスした場合、そのユーザーの[Account]({{< relref "../entities/account.md" >}})エンティティに`source`が付与されたものが返ります。

## 認証されたユーザーとしてアクションを実行する {#actions}

認証されたユーザーのトークンを付与すると、トークンのスコープ内にあるユーザーとして任意のアクションを実行できるようになります。

### 投稿とその削除 {#statuses}

* [POST /api/v1/statuses](../methods/statuses/#publish-new-status)で投稿を作成できます。
  * [/api/v1/media]({{< relref "../methods/statuses/media.md" >}})でメディアを添付できます。
  * [/api/v1/scheduled\_statuses]({{< relref "../methods/statuses/scheduled_statuses.md" >}})で時間指定投稿が使用できます。

### タイムライン {#timelines}

* [/api/v1/timelines]({{< relref "../methods/timelines/" >}})でタイムラインにアクセスできます。
* [/api/v1/markers]({{< relref "../methods/timelines/markers.md" >}})でタイムライン上の特定の位置を記録し、呼び出すことができます。
* [/api/v1/statuses]({{< relref "../methods/statuses/" >}})でそのトゥートに対してアクションを実行できます。
  * [/api/v1/polls]({{< relref "../methods/statuses/polls.md" >}})でアンケートを見たり、投票することができます。
* [/api/v1/lists]({{< relref "../methods/timelines/lists.md" >}})で[GET /api/v1/timelines/list/:list\_id](../methods/timelines/#list-timeline)を使用するために必要なIDを取得できます。
* [/api/v1/conversations]({{< relref "../methods/timelines/conversations.md" >}})で公開範囲が「ダイレクト」の会話を取得できます。
* [/api/v1/favourites]({{< relref "../methods/accounts/favourites.md" >}})でお気に入り登録したトゥートの一覧を取得できます。
* [/api/v1/bookmarks]({{< relref "../methods/accounts/bookmarks.md" >}})でブックマークに登録したトゥートの一覧を取得できます。

### 他のユーザーとの関わり {#accounts}

* [/api/v1/accounts]({{< relref "../methods/accounts/" >}})で他のユーザーに対してアクションを実行できます。
* [/api/v1/follow\_requests]({{< relref "../methods/accounts/follow_requests.md" >}})でフォローリクエストを操作できます。
* [/api/v1/mutes]({{< relref "../methods/accounts/mutes.md" >}})でミュートしたユーザーの一覧を取得できます。
* [/api/v1/blocks]({{< relref "../methods/accounts/blocks.md" >}}でブロックしたユーザーの一覧を取得できます。

### 通知を取得する {#notifications}

* [/api/v1/notifications]({{< relref "../methods/notifications/" >}})で通知を操作できます。
* [/api/v1/push]({{< relref "../methods/notifications/push.md" >}})でプッシュ通知を購読できます。

### 検索・発見機能 {#discovery}

* [/api/v2/search]({{< relref "../methods/search.md" >}})で検索できます。
* [/api/v1/suggestions]({{< relref "../methods/accounts/suggestions.md" >}})でフォロー推奨ユーザーの一覧を取得できます。

### セーフティ機能 {#safety}

* [/api/v1/filters]({{< relref "../methods/accounts/filters.md" >}})でタイムラインを特定ワードを使用しフィルタできます。
* [/api/v1/domain\_blocks]({{< relref "../methods/accounts/domain_blocks.md" >}})でブロックするドメインを設定できます。
* [/api/v1/reports]({{< relref "../methods/accounts/reports.md" >}})で通報を作成できます。
* [/api/v1/admin]({{< relref "../methods/admin.md" >}})でユーザーをモデレーションできます。

### アカウントの情報を編集 {#manage}

* [/api/v1/endorsements]({{< relref "../methods/accounts/endorsements.md" >}})でプロフィールに紹介するアカウントを設定できます。
* [/api/v1/featured\_tags]({{< relref "../methods/accounts/featured_tags.md" >}})でプロフィールに紹介するハッシュタグを設定できます。
* [/api/v1/preferences]({{< relref "../methods/accounts/preferences.md" >}})でユーザーの設定を取得できます。

