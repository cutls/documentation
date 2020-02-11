---
title: ルーティング
description: いかにしてHTTPメソッドがコントローラやアクションにマップされるのか。
menu:
  docs:
    weight: 40
    parent: dev
---

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/config/routes.rb" caption="config/routes.rb" >}}

## ルートの説明 {#routes}

MastodonはRuby on Railsを使用し、ルーターは`config/routes.rb`で規定されます。[Ruby on Rails routing guide](https://guides.rubyonrails.org/routing.html)に細かい説明がありますが、このページではMastodonがいかにしてルーティングするかを簡単に説明します。

### ルーティング手順 {#router}

`namespace`はあるコントローラのディレクトリにマップされるためのプレフィクスです。`resources`はその名前空間のディレクトリ内のコントローラにマップされます。`scope`は`module`のコントローラに渡します。例えば、次の短縮されたコードについて考えてみましょう。

{{< code title="config/routes.rb excerpt" >}}
```ruby
namespace :api do
    namespace :v1 do
        resources :statuses, only [:create, :show, :destroy] do
            scope module: :statuses do
                resource :favourite, only: :create
                resource :unfavourite, to: 'favourites#destroy'
                member do
                    get :context
                end
            end
        end
    end
end
```
{{< /code >}}

最初に利用可能なリソースは`:statuses`です。これは、`:api`と`v1`という名前空間下にネストされます。結果として/api/v1/statusesにルーティングされます。`only`は特定の許可されたメソッドを定義します。これは`app/controllers/api/v1/statuses_controller.rb`のコントローラで定義されています。

/api/v1/statuses内には、追加のリソースが定義された`:statuses`モジュールへのスコープがあります。そのリソースへのコントローラは`app/controllers/api/v1/statuses/`にあります。例えば`:favourite`は`app/controllers/api/v1/statuses/favourites_controller.rb`内の`#create`アクションによってハンドルされ、`:unfavourite`は同一のコントローラの`#destroy`アクションでハンドルされます。

このスコープ内にはあらゆる`member`へのカスタムメソッドが定義されています。つまり、全てのstatusは`app/controllers/api/v1/statuses_controller.rb`でコントロールされ、`GET /api/v1/statuses/:id/context`にマップされます。

### 利用可能なメソッド {#methods}

#### :index

HTTP GETへのマップで、リストに使用します。コントローラ内の`#index`アクションによってハンドルされます。

#### :show

HTTP GETへのマップで、単一のビューに使用します。コントローラ内の`#show`アクションによってハンドルされます。

#### :create

HTTP POSTへのマップです。コントローラ内の`#create`アクションによってハンドルされます。

#### :update

HTTP PUTへのマップです。コントローラ内の`#update`アクションによってハンドルされます。

#### :destroy

HTTP DELETEへのマップです。コントローラ内の`#destroy`アクションによってハンドルされます。

## .well-known {#well-known}

### /.well-known/host-meta {#host-meta}

Extensible Resource Descriptor \(XRD\)です。Webfingerの存在を公表します。

### /.well-known/nodeinfo {#nodeinfo}

Maps to NodeInfo 2.0 endpoint at `/nodeinfo/2.0`, used for advertising software name and version, protocols, usage statistics, and whether registrations are open.

### /.well-know/webfinger {#webfinger}

Used for discovering ActivityPub actor id. See [Spec compliance &gt; WebFinger]({{< relref "../spec/webfinger.md" >}}) for more information.

### /.well-known/change-password {#change-password}

Maps to account settings page.

### /.well-known/keybase-proof-config {#keybase}

Used for integration with Keybase, defining which usernames are acceptable and where proofs may be checked.

{{< hint style="warning" >}}
The sections below this point are under construction.
{{< /hint >}}

## Public URIs {#public}

* `/users/username` = user URI
* `/users/username/remote_follow` = remote follow dialog
* `/users/username/statuses/id` = status URI
* `/@username` = "toots" tab
* `/@username/with_replies` = "toots and replies" tab
* `/@username/media` = "media" tab
* `/@username/tagged/:hashtag` = tagged statuses by user
* `/@username/:status_id` = status permalink
* `/@username/:status_id/embed` = embeddable version
* `/interact/:status_id` = remote interaction dialog
* `/explore` = profile directory
* `/explore/:hashtag` = profiles with this hashtag in bio
* `/public` = public timeline preview
* `/about` = landing page
* `/about/more` = extended description
* `/terms` = terms of service

## API {#api}

* /api/oembed
* /api/proofs
* /api/v1
  * [statuses]({{< relref "../methods/statuses/" >}}) \[create, show, destroy\]
    * reblogged\_by \[index\]
    * favourited\_by \[index\]
    * reblog \[create\]
    * unreblog \[POST reblog\#destroy\]
    * favourite \[create\]
    * unfavourite \[POST favourites\#destroy\]
    * bookmark \[create\]
    * unbookmark \[POST bookmarks\#destroy\]
    * mute \[create\]
    * unmute \[POST mutes\#destroy\]
    * pin \[create\]
    * unpin \[POST pins\#destroy\]
    * context \[GET\]
  * [timelines]({{< relref "../methods/timelines/" >}})
    * home \[show\]
    * public \[show\]
    * tag \[show\]
    * list \[show\]
  * [streaming]({{< relref "../methods/timelines/streaming.md" >}}) \[index\]
  * [custom\_emojis]({{< relref "../methods/instance/custom_emojis.md" >}}) \[index\]
  * [suggestions]({{< relref "../methods/accounts/suggestions.md" >}}) \[index, destroy\]
  * [scheduled\_statuses]({{< relref "../methods/statuses/scheduled_statuses.md" >}}) \[index, show, update, destroy\]
  * [preferences]({{< relref "../methods/accounts/preferences.md" >}}) \[index\]
  * [conversations]({{< relref "../methods/timelines/conversations.md" >}}) \[index, destroy\]
    * read \[POST\]
  * [media]({{< relref "../methods/statuses/media.md" >}}) \[create, update\]
  * [blocks]({{< relref "../methods/accounts/blocks.md" >}}) \[index\]
  * [mutes]({{< relref "../methods/accounts/mutes.md" >}}) \[index\]
  * [favourites]({{< relref "../methods/accounts/favourites.md" >}}) \[index\]
  * [bookmarks]({{< relref "../methods/accounts/bookmarks.md" >}}) \[index\]
  * [reports]({{< relref "../methods/accounts/reports.md" >}}) \[create\]
  * [trends]({{< relref "../methods/instance/trends.md" >}}) \[index\]
  * [filters]({{< relref "../methods/accounts/filters.md" >}}) \[index, create, show, update, destroy\]
  * [endorsements]({{< relref "../methods/accounts/endorsements.md" >}}) \[index\]
  * [markers]({{< relref "../methods/timelines/markers.md" >}}) \[index, create\]
  * [apps]({{< relref "../methods/apps/" >}}) \[create\]
    * verify\_credentials \[credentials\#show\]
  * [instance]({{< relref "../methods/instance/" >}}) \[show\]
    * peers \[index\]
    * activity \[show\]
  * [domain\_blocks]({{< relref "../methods/accounts/domain_blocks.md" >}}) \[show, create, destroy\]
  * [directory]({{< relref "../methods/instance/directory.md" >}}) \[show\]
  * [follow\_requests]({{< relref "../methods/accounts/follow_requests.md" >}}) \[index\]
    * authorize \[POST\]
    * reject \[POST\]
  * [notifications]({{< relref "../methods/notifications/" >}}) \[index, show\]
    * clear \[POST\]
    * dismiss \[POST\]
  * [accounts]({{< relref "../methods/accounts/" >}})
    * verify\_credentials \[GET credentials\#show\]
    * update\_credentials \[PATCH credentials\#update\]
    * search \[show \(search\#index\)\]
    * relationships \[index\]
  * [accounts]({{< relref "../methods/accounts/" >}}) \[create, show\]
    * statuses \[index accounts/statuses\]
    * followers \[index accounts/follower\_accounts\]
    * following \[index accounts/following\_accounts\]
    * lists \[index accounts/lists\]
    * identity\_proofs \[index accounts/identity\_proofs\]
    * follow \[POST\]
    * unfollow \[POST\]
    * block \[POST\]
    * unblock \[POST\]
    * mute \[POST\]
    * unmute \[POST\]
    * pin \[POST\]
    * unpin \[POST\]
  * [lists]({{< relref "../methods/timelines/lists.md" >}}) \[index, create, show, update, destroy\]
    * accounts \[POST accounts/pins\#destroy\]
  * [featured\_tags]({{< relref "../methods/accounts/featured_tags.md" >}}) \[index, create, destroy\]
    * suggestions \[GET suggestions\#index\]
  * [polls]({{< relref "../methods/statuses/polls.md" >}}) \[create, show\]
    * votes \[create polls/votes\]
  * [push]({{< relref "../methods/notifications/push.md" >}})
    * subscription \[create, show, update, destroy\]
  * [admin]({{< relref "../methods/admin.md" >}})
    * accounts \[index, show\]
      * enable \[POST\]
      * unsilence \[POST\]
      * unsuspend \[POST\]
      * approve \[POST\]
      * reject \[POST\]
      * action \[create account\_actions\]
    * reports \[index, show\]
      * assign\_to\_self \[POST\]
      * unassign \[POST\]
      * reopen \[POST\]
      * resolve \[POST\]
* /api/v2
  * [search]({{< relref "../methods/search.md" >}}) \[GET search\#index\]

