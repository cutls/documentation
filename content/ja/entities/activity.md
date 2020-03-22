---
title: Activity
description: インスタンスアクティビティの毎週のバケット情報
menu:
  docs:
    parent: entities
---

## 例

```javascript
{
  "week": "1574640000",
  "statuses": "37125",
  "logins": "14239",
  "registrations": "542"
}
```

## 属性

### `week` {#week}

**Description:** 週の最初の日の0:00のタイムスタンプ\
**Type:** String \(UNIX Timestamp\)\
**Version history:** Added in 2.1.2

### `statuses` {#statuses}

**Description:** 週が始まってからの投稿総数\
**Type:** String \(整数からのキャスト\)\
**Version history:** Added in 2.1.2

### `logins` {#logins}

**Description:** 週が始まってからのユーザーのログイン数\
**Type:** String \(整数からのキャスト\)\
**Version history:** Added in 2.1.2

### `registrations` {#registrations}

**Description:** 週が始まってからの新規登録者数\
**Type:** String \(整数からのキャスト\)\
**Version history:** Added in 2.1.2

## 他に

* [GET /api/v1/instance/activity](../methods/instance/#weekly-activity)

{{< page-ref page="methods/instance.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/controllers/api/v1/instances/activity_controller.rb" caption="app/controllers/api/v1/instances/activity\_controller.rb" >}}



