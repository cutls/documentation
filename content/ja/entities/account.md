---
title: Account
description: Mastodonのユーザーとその関連プロフィールに関する情報
menu:
  docs:
    parent: entities
---

## 例

```javascript
{
  "id": "23634",
  "username": "noiob",
  "acct": "noiob@awoo.space",
  "display_name": "ikea shark fan account",
  "locked": false,
  "bot": false,
  "created_at": "2017-02-08T02:00:53.274Z",
  "note": "<p>:ms_rainbow_flag:​ :ms_bisexual_flagweb:​ :ms_nonbinary_flag:​ <a href=\"https://awoo.space/tags/awoo\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>awoo</span}.space <a href=\"https://awoo.space/tags/admin\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>admin</span} ~ <a href=\"https://awoo.space/tags/bi\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>bi</span} ~ <a href=\"https://awoo.space/tags/nonbinary\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>nonbinary</span} ~ compsci student ~ likes video <a href=\"https://awoo.space/tags/games\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>games</span} and weird/ old electronics and will post obsessively about both ~ avatar by <span class=\"h-card\"><a href=\"https://weirder.earth/@dzuk\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>dzuk</span}</span></p>",
  "url": "https://awoo.space/@noiob",
  "avatar": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "avatar_static": "https://files.mastodon.social/accounts/avatars/000/023/634/original/6ca8804dc46800ad.png",
  "header": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "header_static": "https://files.mastodon.social/accounts/headers/000/023/634/original/256eb8d7ac40f49a.png",
  "followers_count": 547,
  "following_count": 404,
  "statuses_count": 28468,
  "last_status_at": "2019-11-17T00:02:23.693Z",
  "emojis": [
    {
      "shortcode": "ms_rainbow_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/028/691/original/6de008d6281f4f59.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/028/691/static/6de008d6281f4f59.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_bisexual_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/050/744/original/02f94a5fca7eaf78.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/050/744/static/02f94a5fca7eaf78.png",
      "visible_in_picker": true
    },
    {
      "shortcode": "ms_nonbinary_flag",
      "url": "https://files.mastodon.social/custom_emojis/images/000/105/099/original/8106088bd4782072.png",
      "static_url": "https://files.mastodon.social/custom_emojis/images/000/105/099/static/8106088bd4782072.png",
      "visible_in_picker": true
    }
  ],
  "fields": [
    {
      "name": "Pronouns",
      "value": "they/them",
      "verified_at": null
    },
    {
      "name": "Alt",
      "value": "<span class=\"h-card\"><a href=\"https://cybre.space/@noiob\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>noiob</span}</span>",
      "verified_at": null
    },
    {
      "name": "Bots",
      "value": "<span class=\"h-card\"><a href=\"https://botsin.space/@darksouls\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>darksouls</span}</span>, <span class=\"h-card\"><a href=\"https://botsin.space/@nierautomata\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>nierautomata</span}</span>, <span class=\"h-card\"><a href=\"https://mastodon.social/@fedi\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>fedi</span}</span>, code for <span class=\"h-card\"><a href=\"https://botsin.space/@awoobot\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>awoobot</span}</span>",
      "verified_at": null
    },
    {
      "name": "Website",
      "value": "<a href=\"http://shork.xyz\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">shork.xyz</span><span class=\"invisible\"></span}",
      "verified_at": "2019-11-10T10:31:10.744+00:00"
    }
  ]
}
```

## 基本の属性

### **`id`** {#id}

**Description:** アカウントのID\
**Type:** String \(整数からキャストされますが、数値であるとは限りません\)\
**Version history:** Added in 0.1.0

### `username` {#username}

**Description:** ドメイン(@以降)を含まないユーザーネーム\
**Type:** String\
**Version history:** Added in 0.1.0

### `acct` {#acct}

**Description:** WebfingerのアカウントURL
ローカルユーザーは`username`と同じで、リモートユーザーは`username@domain`\
**Type:** String\
**Version history:** Added in 0.1.0

### `url` {#url}

**Description:** ユーザーの公開プロフィールのURL\
**Type:** String \(HTTPS URL\)\
**Version history:** Added in 0.1.0

## 表示に関する属性

### `display_name` {#display_name}

**Description:** プロフィールの表示名\
**Type:** String\
**Version history:** Added in 0.1.0

### `note` {#note}

**Description:** プロフィールの自己紹介\
**Type:** String \(HTML\)\
**Version history:** Added in 0.1.0

### `avatar` {#avatar}

**Description:** プロフィールや、投稿の隣に出るアイコン\
**Type:** String \(URL\)\
**Version history:** Added in 0.1.0

### `avatar_static` {#avatar_static}

**Description:** `avatar`の静止画版\
`avatar`が静止画の場合、`avatar`と同等。GIFアニメの場合は異なります。\
**Type:** String \(URL\)\
**Version history:** Added in 1.1.2

### `header` {#header}

**Description:** プロフィールの上部やプロフィールカードに使用されるバナー画像¥\
**Type:** String \(URL\)\
**Version history:** Added in 0.1.0

### `header_static` {#header_static}

**Description:** `header`の静止画版\
`header`が静止画の場合、`header`と同等。GIFアニメの場合は異なります。\
**Type:** String \(URL\)\
**Version history:** Added in 1.1.2

### `locked` {#locked}

**Description:** フォローを承認制にしているかどうか\
**Type:** Boolean\
**Version history:** Added in 0.1.0

### `emojis` {#emojis}

**Description:** プロフィールをレンダリングするときに必要なカスタム絵文字の情報。無い場合は空の配列。\
**Type:** Array of [Emoji](emoji.md)\
**Version history:** Added in 2.4.0

### `discoverable` {#discoverable}

**Description:** アカウントがディレクトリ(オプトイン方式)に掲載されているかどうか。\
**Type:** Boolean\
**Version history:** Added in 3.1.0

## 統計的な属性

### `created_at` {#created_at}

**Description:** アカウントの作成日時\
**Type:** String \(ISO 8601 Datetime\)\
**Version history:** Added in 0.1.0

### `statuses_count` {#statuses_count}

**Description:** 投稿総数\
**Type:** Number\
**Version history:** Added in 0.1.0

### `followers_count` {#followers_count}

**Description:** フォロワーの数.\
**Type:** Number\
**Version history:** Added in 0.1.0

### `following_count` {#following_count}

**Description:** フォロー数\
**Type:** Number\
**Version history:** Added in 0.1.0

## 追加の属性

### `moved` {#moved}

**Description:** そのプロフィールがアクティブ状態でなく、新しい別のアカウントに引っ越した場合、その引越し先。\
**Type:** [Account](account.md)\
**Version history:** Added in 2.1.0

### `fields` {#fields}

**Description:** 名前-内容 ペアのプロフィールに対する追加情報\
**Type:** Array of [Field]({{< relref "field.md" >}})\
**Version history:** Added in 2.4.0

### `bot` {#bot}

**Description:** 表現上のフラグ。アカウントの動作が自動化されている場合に`true`\
**Type:** Boolean\
**Version history:** Added in 2.4.0

### `source` {#source}

**Description:** [verify credentials](../methods/accounts/#verify-account-credentials)と[update credentials](../methods/accounts/#update-account-credentials)の時のみ付与される追加情報。\
**Type:** [Source](source.md)\
**Version history:** Added in 2.4.0

## 他に

{{< page-ref page="methods/accounts.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/account_serializer.rb" caption="app/serializers/rest/account\_serializer.rb" >}}





