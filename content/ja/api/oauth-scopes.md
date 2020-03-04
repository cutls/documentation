---
title: OAuthスコープ
description: APIでできることを。権限。
menu:
  docs:
    weight: 10
    parent: api
---

## OAuthスコープ

スコープは階層的です。つまり、`read`にアクセスできる場合、`read:accounts`は自動的に適用されます。**アプリケーションはユーザーに対してできるだけ少ない要求を行うようにすべきです**

複数のスコープを同時に要求できます。パラメーターを使用してアプリを作成するとき`scopes`、OAuthで認証するときは`scope`クエリパラメーターを使用します(スコープをスペースで区切ります)。

{{< hint style="info" >}}
> **注意** `scope`と`scopes`の違いに気をつけてください。`scope`は標準的なOAuthのパラメーター名でOAuthメソッド中はこれを使いますが、MastodonのAPIではより適切な`scopes`が用いられます。
{{< /hint >}}

`scope`が認証時に無かったり、`scopes`がアプリケーション登録時に無い場合は`read`として扱われます。

アプリの作成中に保存されるスコープのセットには、認証リクエストでリクエストするすべてのスコープが含まれている必要があります。そうでない場合、認証は失敗します。

### 実装履歴 {#versions}

- 0.9.0 - read, write, follow
- 2.4.0 - push
- 2.4.3 - 詳細なスコープ(`:`以下のスコープ) [https://github.com/tootsuite/mastodon/pull/7929](https://github.com/tootsuite/mastodon/pull/7929)
- 2.6.0 - read:reportsを削除 \(unused stub\) [https://github.com/tootsuite/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f](https://github.com/tootsuite/mastodon/pull/8736/commits/adcf23f1d00c8ff6877ca2ee2af258f326ae4e1f)
- 2.6.0 - write:conversationsスコープを追加 [https://github.com/tootsuite/mastodon/pull/9009](https://github.com/tootsuite/mastodon/pull/9009)
- 2.9.1 - Admin関連スコープを追加 [https://github.com/tootsuite/mastodon/pull/9387](https://github.com/tootsuite/mastodon/pull/9387)
- 3.1.0 - Bookmark関連スコープを追加

## スコープ一覧

### `read` {#read}

データの読み取りを許可します。`read`は`read:*`を意味します。read:~と書いてあるものが全て許可されます。

### `write` {#write}

データの変更を許可します。`write`は`write:*`を意味します。write:~と書いてあるものが全て許可されます。

### `follow` {#follow}

フォロー関係を読み取り、変更できます。`follow`は`follow:*`を意味します。follow:~と書いてあるものが全て許可されます。

* `read:blocks`, `write:blocks`
* `read:follows`, `write:follows`
* `read:mutes`, `write:mutes`

### `push` {#push}

[Web Push APIの購読]({{< relref "../methods/notifications/push.md" >}})を許可します。Mastodon 2.4.0で追加されました。

### Admin関連スコープ {#admin}

モデレーションAPIのために使用されます。Mastodon 2.9.1で追加されました。以下の`:`1階層スコープを許容します。つまり`admin`というスコープはなく、`admin:read`と`admin:write`が独立して存在します。

* `admin:read`
  * `admin:read:accounts`
  * `admin:read:reports`
* `admin:write`
  * `admin:write:accounts`
  * `admin:write:reports`

## 詳細なスコープ {#granular}

| read | write |
| :--- | :--- |
| read:accounts | write:accounts |
| **read:blocks** | **write:blocks** |
| read:bookmarks | write:bookmarks |
|  | write:conversations |
| read:favourites | write:favourites |
| read:filters | write:filters |
| **read:follows** | **write:follows** |
| read:lists | write:lists |
|  | write:media |
| **read:mutes** | **write:mutes** |
| read:notifications | write:notifications |
|  | write:reports |
| read:search |  |
| read:statuses | write:statuses |

| admin:read | admin:write |
| :--- | :--- |
| admin:read:accounts | admin:write:accounts |
| admin:read:reports | admin:write:reports |

