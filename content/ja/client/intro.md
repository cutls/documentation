---
title: API事始め
description: REST APIやHTTPリクエスト、レスポンス、パラメータの基本事項
menu:
  docs:
    weight: 10
    parent: client
---

## RESTの概要 {#rest}

MastodonはREST APIを通じてデータを提供します。RESTとは REpresentational State Transfer の略です。しかし、Mastodonではリクエストに基づいた様々なリソースについて情報を送受信するものとしてREST APIを使用します。Mastodon REST APIはリクエストにHTTPを、ペイロードにJSONを使用します。


## HTTPリクエストとレスポンスの説明 {#http}

REST APIエンドポイントは特定のHTTPメソッドで呼び出されます。そして、同一のエンドポイントに複数のHTTPメソッドを使い分ける場合もあります。Mastodon APIは一般に以下のHTTPメソッドを使用します。

* **GET**: リソースの読み込みと閲覧
* **POST**: サーバへの情報の送信
* **PUT** \| **PATCH**: リソースのアップデート
* **DELETE**: リソースの削除

あなたが使用するプログラミング言語はおそらくHTTPリクエストのためのユーティリティやライブラリを提供しています。この章では、cURLを例として用います。これは、`curl`コマンドとして多くのOSにプリインストールされているコマンドラインユーティリティです。

cURLでは、デフォルトのHTTPメソッドはGETです。`--request`または`-X`フラグで特定のメソッドを指定できます。例えば、`curl -X POST`でGETではなくPOSTメソッドでリクエストすることができます。また、`-i`フラグでHTTPヘッダーを追加で含めることもできます。

## パラメータの付与 {#parameters}

HTTPリクエストに様々な方法で追加のパラメータを付与することができます。Mastodon APIではクエリ文字列、form data、JSONのいずれかのみを解釈します。

{{< hint style="info" >}}
POSTボディとして送信されたクエリ文字列、from data、JSONは等しくAPIによって解釈されます。クエリ文字列はGETリクエストに、form dataとJSONはGET以外のリクエストに使用されるのが一般的です。
{{< /hint >}}

### クエリ文字列 {#query-strings}

普通のURLの末尾にクエリ文字列を追加してリクエストします。クエリ文字列は`?`を先頭に`パラメータ=値`の形で追加していきます。複数のクエリ文字列同士は`&`で区切られます。例:

```bash
curl https://mastodon.example/endpoint?q=test&n=0
```

### Form data {#form-data}

クエリ文字列で直接URLに手を加える代わりに、データを別に送信することもできます。cURLでは、`--data`または`-d`フラグを付与することでデータを指定できます。データはクエリ文字列のときと同じように一緒にして指定しても、複数のデータフラグを使用してパラメータ - 値ごとに指定しても構いません。また、`--form`または`-F`フラグをパラメータ - 値ペアごとに指定すると、ファイルのようなマルチパートなデータを送信することができます。例:

```bash
# そのままクエリ文字列として送信
curl -X POST \
     -d 'q=test&n=0' \
     https://mastodon.example/endpoint
# 別々にして送信
curl -X POST \
     -d 'q=test' \
     -d 'n=0' \
     https://mastodon.example/endpoint
# 明示的にフォームエンコードされます。マルチパートデータを扱えます。
curl -X POST \
     -F 'q=test' \
     -F 'n=0' \
     -F 'file=@filename.jpg' \
     https://mastodon.example/endpoint
```

### JSON {#json}

form dataのときと同じようなものですが、JSONフォーマットであると宣言するためにヘッダーを付与します。cURLでJSONデータを送信するためには、content typeをJSONに指定して、そしてform dataとしてJSONを送信します。

```bash
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"parameter": "value}' \
     https://mastodon.example/endpoint
```

## データの種類 {#types}

### 複数の値 \(配列\) {#array}

パラメーターに配列を用いる場合は、ブラケット表記を使用してエンコードする必要があります。例えば、`array[]=foo&array[]=bar`は以下のように解釈されます。

```ruby
array = [
  'foo',
  'bar',
]
```

JSONとして解釈する場合の配列の表現

```javascript
{
  "array": ["foo", "bar"]
}
```

### ネストされたパラメータ \(ハッシュ\) {#hash}

一部のパラメータはネストされる必要があります。そのためにはブラケット表記を使用してください。例えば、`source[privacy]=public&source[language]=ja`は以下のように解釈されます。

```ruby
source = {
  privacy: 'public',
  language: 'ja',
}
```

JSONとして解釈する場合、発しぃは以下のように解釈されます。

```javascript
{
  "source": {
    "privacy": "public",
    "language", "ja"
  }
}
```

### 真偽値 \(Boolean\) {#boolean}

`0`, `f`, `F`, `false`, `FALSE`, `off`, `OFF`は偽として解釈されます。空の文字列だった場合「値が提供されなかった」として解釈されます。その他の文字列は真として解釈されます。JSONデータを使用している場合、代わりに`true`,`false`,`null`リテラル表現を使用してください。

### ファイル {#file}

ファイルをアップロードするときは、`multipart/form-data`でエンコードしてください。

これは配列と組み合わせることもできます。

## APIのレスポンスデータの使用 {#responses}

Mastodon REST APIはレスポンスとしてJSONを返します。また、レスポンスの処理に役立つ可能性のあるHTTPヘッダーと、サーバが要求を処理した方法を通知するHTTPステータスコードも返します。

* 200 = OK。リクエストは正しくハンドリングされています。
* 4xx = クライアントエラー。リクエストが正しくありません。401　Unauthorized, 404 Not Found, 410 Gone, 422 Unprocessedをよく見ると思います。
* 5xx = Server error. Something went wrong while handling the request. Most commonly, you may see 503 Unavailable.
* 5xx = サーバーエラー。リクエストを処理中に不具合が発生しました。502 Unavailableをよく見ると思います。

