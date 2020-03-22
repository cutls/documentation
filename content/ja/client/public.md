---
title: 公開情報の利用
description: エンドポイントとエンティティに精通する。
menu:
  docs:
    weight: 20
    parent: client
---

cURLコマンドラインを使ったり、好きなプログラム言語でライブラリやユーティリティを使ってHTTPリクエストをする方法を学びました。次はエンドポイントやレスポンスについて学びましょう。

## エンドポイントの説明 {#endpoints}

全てのHTTPリクエストはターゲットのURLに対して作成されます。ウェブサイトにデータをリクエストするときには、特定のURLを使用します。URLによってHTTPサーバにリクエストが解釈され、適切なレスポンスを得ることができます。

仮想的にmastodon.exampleというMastodonサーバを使用して例を挙げます。mastodon.exampleは`https://mastodon.example`にホストされています。`/`がルートで、特定のサブディレクトリやパスはエンドポイントです。MasodonのAPIエンドポイントは`?api`名前空間下にネストされていて、現在ほとんどのエンドポイントは`/api/v1`下にあります。リクエストはHTTPメソッドとそのエンドポイントによって挙げられます。`GET /api/v1/endpoint`はGETメソッドでサーバのドメインにそのエンドポイントのリクエストを作成するという意味です。つまり、`https://mastodon.example/api/v1/endpoint`にアクセスします。

## 公開タイムラインを取得 {#timelines}

公開タイムラインは、Mastodonからの公開データに対する最も一般的なユースケースです。

[GET /api/v1/timelines/public](../methods/timelines/#public-timeline)は以下のようにして試せます。

```bash
curl https://mastodon.example/api/v1/timelines/public
```

すげぇ、このレスポンスめっちゃテキストあるやん！公開タイムラインはデフォルトでは20の投稿を返します。`limit`パラメータを使用すれば減らすこともできます。同じエンドポイントに、取得数の制限を2にしてもう一度リクエストしてみましょう。

```bash
curl https://mastodon.example/api/v1/timelines/public?limit=2
```

レスポンスはもっと管理しやすいものであるべきです。好きなユーティリティでJSONをパースまたは整形して、以下のような構造を持つことを確かめてください。

```javascript
[
  {
    "id": "103206804533200177",
    "created_at": "2019-11-26T23:27:31.000Z",
    ...
    "visibility": "public",
    ...
  },
  {
    "id": "103206804086086361",
    "created_at": "2019-11-26T23:27:32.000Z",
    ...
    "visibility": "public",
    ...
  }
]
```

ハッシュタグに関しても同様に[GET /api/v1/timelines/tag/:hashtag](../methods/timelines/#hashtag-timeline)にリクエストすることで可能です。コロン( : )はエンドポイントの:が付いた部分はパスパラメータです。この場合は:hashtagなのでここにハッシュタグの名前を書くということになります。\(今回も同様に最大2件という制限を入れています\) `#cat`のついた投稿について: 

```bash
curl https://mastodon.example/api/v1/timelines/tag/cats?limit=2
```

今回もまた、JSON形式で[Status]({{< relref "../entities/status.md" >}})エンティティの2項の配列が返ってきたと思います。JSONを配列ごとに、オブジェクトごとにパースできます。もしPythonを使用するなら、コードは以下のようになると思います。

```python
import requests
import json

response = requests.get("https://mastodon.example/api/v1/timelines/tag/cats?limit=2")
statuses = json.dumps(response.text) # this converts the json to a python list of dictionary
assert statuses[0]["visibility"] == "public" # we are reading a public timeline
print(statuses[0]["content"]) # this prints the status text
```

{{< hint style="info" >}}
あなたの書くプログラムでJSONをパースしたりそれを使用したりするのは、このチュートリアルの範疇ではありません。また、他の言語やプログラム設計の場合書き方も異なります。あなたの書くプログラミング言語におけるJSONの扱い方に関しては他のチュートリアルを参照してください。
{{< /hint >}}

{{< hint style="info" >}}
[MastoVue](https://mastovue.glitch.me)(英語)や[mstpubapi](https://mstpubapi.herokuapp.com/)(日本語)は公開タイムラインを見るアプリケーションの例です。
{{< /hint >}}

## 公開アカウントやその投稿を取得する {#toots}

リクエストの作成とレスポンスの扱い方について慣れてきたら、他の面白そうな公開情報にもアクセスしてみましょう。

* アカウントのIDを知っているなら、[GET /api/v1/accounts/:id](../methods/accounts/#account)を使用して[Account]({{< relref "../entities/account.md" >}})エンティティを見ることができます。
  * そのアカウントが投稿したものを見るためには、[GET /api/v1/accounts/:id/statuses](../methods/accounts/#statuses)を使用してレスポンス([Status]({{< relref "../entities/status.md" >}})エンティティの配列)をパースしてください。
* 投稿のIDを知っているなら、[GET /api/v1/statuses/:id](../methods/statuses/#view-specific-status)でStatusエンティティを取得できます。
  * [GET /api/v1/statuses/:id/reblogged\_by](../methods/statuses/#boosted-by)でその投稿を誰がブーストしたかを取得できます。
  * Requesting [GET /api/v1/statuses/:id/context](../methods/statuses/#parent-and-child-statuses) will show you the ancestors and descendants of that status in the tree that is the conversational thread.
  * [GET /api/v1/statuses/:id/context](../methods/statuses/#parent-and-child-statuses)にリクエストすると、その投稿が属する会話(子孫と先祖にあたる投稿)を取得できます。
  * もし投稿にアンケートが付与されている場合、[GET /api/v1/polls/:id](../methods/statuses/polls.md#view-a-poll)で投票だけを個別に取得できます。

アカウントや投稿、アンケートのIDはMastodonのウェブサイトごとにデータベースが異なるため、各サーバごとに異なります。同じユーザーの投稿でもAPIがホストされているドメインによってIDはバラバラだと言うことです。

## インスタンスの情報を取得する {#instance}

認証情報無しで見ることができる公開情報としては他にMastodonウェブサイトの情報があります。

* View general information with [GET /api/v1/instance](../methods/instance/#fetch-instance),
* [GET /api/v1/instance](../methods/instance/#fetch-instance)で一般的なインスタンスの情報を取得できます。
  * 連合しているドメインは[GET /api/v1/instance/peers](../methods/instance/#list-of-connected-domains)で取得できます。
  * 毎週のアクティビティは[GET /api/v1/instance/activity](../methods/instance/#weekly-activity)で取得できます。
  * カスタム絵文字は[GET /api/v1/custom\_emojis](../methods/instance/custom_emojis.md#custom-emoji)で取得できます。
* [GET /api/v1/directory](../methods/instance/directory.md#view-profile-directory)で全ての利用可能なプロフィールの一覧(ディレクトリ)を取得できます。
* [GET /api/v1/trends](../methods/instance/trends.md#trending-tags)で現在のトレンドハッシュタグを取得できます。

{{< hint style="info" >}}
インスタンス情報だけでできることの例として、インスタンスのカスタム絵文字一覧が取得できる[emojos.in](https://emojos.in/)(英語)、[カスタム絵文字でお絵かきツール](https://mamemomonga.github.io/mastodon-custom-emoji-oekaki/)(日本語)があります。
{{< /hint >}}

