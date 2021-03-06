---
title: featured_tags
description: よく使うタグの登録
menu:
  docs:
    weight: 100
    parent: methods-accounts
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/featured_tags" title="View your featured tags" >}}
{{< api-method-description >}}

**戻り値:**FeaturedTagの配列\
**OAuth:** User token + `read:accounts`\
**実装履歴:**

- 3.0.0 - 追加されました

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "id": "627",
    "name": "nowplaying",
    "statuses_count": 36,
    "last_status_at": "2019-11-15T07:14:43.524Z"
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}

Invalid or missing Authorization header
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/featured_tags" title="Feature a tag" >}}
{{< api-method-description >}}

**戻り値:** FeaturedTag\
**OAuth:** User token + `write:accounts`\
**実装履歴:**

- 3.0.0 - 追加されました

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="name" type="string" required=true >}}
The hashtag to be featured.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

FeaturedTagはある特定の`name`を付けて作成されます。
{{< endapi-method-response-example-description >}}


```javascript
{
  "id": "13174",
  "name": "circasurvive",
  "statuses_count": 11,
  "last_status_at": "2019-11-15T06:20:32.769Z"
}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=422 >}}
{{< api-method-response-example-description >}}

`name`が有効なハッシュタグで無い場合、例えば許可されていない文字や数字だけの場合
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Validation failed: Tag is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/featured_tags/:id" title="Unfeature a tag" >}}
{{< api-method-description >}}

**戻り値:** 空のオブジェクト\
**OAuth:** User token + `write:accounts`\
**実装履歴:**

- 3.0.0 - 追加されました

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
The id of the FeaturedTag to be unfeatured.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

An empty object will be returned if the featured tag was successfully deleted.
{{< endapi-method-response-example-description >}}


```javascript
{}
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=404 >}}
{{< api-method-response-example-description >}}

If the ID does not exist or is not owned by you
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "Record not found"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/featured_tags/suggestions" title="Suggested tags to feature" >}}
{{< api-method-description >}}

Shows your 10 most-used tags, with usage history for the past week.

**戻り値:** Array of Tag with History\
**OAuth:** User token + `read:accounts`\
**実装履歴:**

- 3.0.0 - 追加されました

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Truncated results to first and last tag.
{{< endapi-method-response-example-description >}}


```javascript
[
  {
    "name": "nowplaying",
    "url": "https://mastodon.social/tags/nowplaying",
    "history": [
      {
        "day": "1574553600",
        "uses": "200",
        "accounts": "31"
      },
      {
        "day": "1574467200",
        "uses": "272",
        "accounts": "39"
      },
      {
        "day": "1574380800",
        "uses": "345",
        "accounts": "40"
      },
      {
        "day": "1574294400",
        "uses": "366",
        "accounts": "46"
      },
      {
        "day": "1574208000",
        "uses": "226",
        "accounts": "32"
      },
      {
        "day": "1574121600",
        "uses": "217",
        "accounts": "42"
      },
      {
        "day": "1574035200",
        "uses": "214",
        "accounts": "34"
      }
    ]
  },
  ...
  {
    "name": "mastothemes",
    "url": "https://mastodon.social/tags/mastothemes",
    "history": [
      {
        "day": "1574553600",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574467200",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574380800",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574294400",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574208000",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574121600",
        "uses": "0",
        "accounts": "0"
      },
      {
        "day": "1574035200",
        "uses": "0",
        "accounts": "0"
      }
    ]
  }
]
```
{{< endapi-method-response-example >}}
{{< api-method-response-example httpCode=401 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript
{
  "error": "The access token is invalid"
}
```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


