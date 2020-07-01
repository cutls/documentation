---
title: Mastodonとは？
description: Mastodonドキュメントへようこそ
menu:
  docs:
    weight: -99
---

{{< youtube id="IPSbNdBmWKE" caption="An introductory video explaining basic Mastodon concepts with visual animations" >}}

## マイクロブログとは？ {#microblogging}

Webサイトを更新するという形でブログを書くっていうのに似ていますが、**マイクロブログ**は小さなコンテンツを更新することであなたのプロフィールを更新していくという仕組みのサービスです。

## 連合とは？ {#federation}

**連合**は脱中央集権化の一つの形です。一つのサービスが中心になりそれをみんなで使うことの代わりに、複数のサービスを存在させ、誰でも、何人でも使えるようにするものです。


|分類|サービス例|
|:---------------------:|--------|
|中央集権的|Twitter, Facebook, Instagram|
|連合的|E-mail, XMPP, 電話網, 郵便|
|分散的|BitTorrent, IPFS, Scuttlebutt|

Mastodonはそれぞれ独立して存在できます。これは昔のウェブサイトでも同様で、ある人が登録し、メッセージを投稿したり画像を投稿したりしておしゃべりを楽しむことができます。しかし、_従来のウェブサイトと異なって_ 複数のMastodonサーバーは各々相互にデータを送受信し、別々のサーバーに登録した人同士で会話できます。これは、Gmailのメールアドレス(gmail.com)からOutlook(outlook.jp)やYahoo!メール(yahoo.co.jp)、ドコモメール(docomo.ne.jp)をはじめあらゆるメールプロバイダにメールを送信できます。**そのアドレスを所有しているいかなるウェブサイトのいかなる人にもメッセージを送りことができます。**

{{< figure src="/assets/image%20%289%29.png" caption="左から中央集権、連合、分散" >}}



## ActivityPubとは？ {#fediverse}

Mastodonは標準化されたオープンな規格である**ActivityPub**を用います。他のActivityPubをサポートするソフトウェアは他のMastodonサーバーと通信できるように、シームレスに通信できます。

これこそが**Fedeverse**(連合する *federated* 宇宙*universe*)です。FediverseとはActivityPubやWWW上でお互いにコミュニケーションを行えるすべてのウェブサイトの総称です。これにはMastodonサーバも含まれますが、他にも様々な実装があります。


* Pleroma, モジュラー型マイクロブログサービス
* Pixelfed, メディア共有型サービス
* Misskey, マイクロブログと並行してカスタマイズできるダッシュボードを備えたもの
* PeerTube, 動画をチャンネルに投稿できる
* Plume, 長文を投稿できる
* 個人的なサービスを含めると、ほかにもたくさんあります。

The fediverse does not have its own brand, so you might more often hear “follow me on Mastodon” than “follow me on the fediverse”, but technically the latter is more correct.
Fediverseはそれ自身のブランドを持っていません。なので、「Mastoodonでフォローして」というより「Fediverseでフォローして」と言った方が技術的には正しいのですが、実際には前者の方がよく聞くと思います。

## 実践的な話 {#implications}

### サーバー選びとそのポリシー {#choice}

自分で新しいサーバーを建てるかという選択をします。Mastodonプロジェクトは推奨されるサーバーの一覧を[joinmastodon.org](https://joinmastodon.org)で公開していて、言語やカテゴリでソートできるようになっています。一部のサーバーは推奨より厳しいモデレーションポリシーを持っています。例えば、潜在的に危険なコンテンツには特定のタグをつけることを要請していたりします。一方で、推奨より緩いモデレーションポリシーを持つものもあります。しかし、[joinmastodon.org](https://joinmastodon.org)上の推奨サーバーは全て[Mastodon Server Covenant](https://joinmastodon.org/covenant)に準拠しています。これは、ヘイトスピーチに反対することを宣誓し、日常的にバックアップをとったり緊急時に管理者を最低一人用意したり、閉鎖3か月前には告知するなどを規定しています。

> Maintaining communities that feel safe for all of its members is not easy. Mastodon provides a lot of foundational framework and tools for doing it, and shifts the power to effect change from one commercial entity to the communities themselves.
>
> -- Eugen Rochko, Jul 6 2018, ["Cage the Mastodon"](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> A centralized social media platform has a hierarchical structure where rules and their enforcement, as well as the development and direction of the platform, are decided by the CEO \[...\] A decentralized network deliberately relinquishes control of the platform owner, by essentially not having one.
>
> -- Eugen Rochko, Dec 30 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### 資金調達と収益化 {#monetization}

すべてのMastodonサーバーは完全に独立した個々の人間や組織が運営しています。Mastodonはいかなる収益モデルをソフトウェアとして実装していません。

一部のサーバーは有料アカウントを提供しています。一部の大企業がホストするサーバーは既存のインフラストラクチャーの上に成立させ収益モデルの一環として無償提供しています。しかし、ほとんどのサーバー管理者はPatreon、Pixiv FANBOX、Fantiaなどのサービスを介してユーザーからのクラウドファンディングに依存しています。一部の管理者は、自分自身とおそらく一部の友人のためにサーバーに自己負担しているにすぎません。もし自分のいるサーバーを金銭的に支援したい場合、寄付や支援の方法をチェックしてみましょう。

Mastodonの開発は[Patreon](https://patreon.com/mastodon)または[OpenCollective](https://opencollective.com/mastodon)を用いたクラウドファンディングで資金を調達しています。**一切のベンチャーキャピタルは関与していません。**

> In my opinion, “instant, public, global messaging and conversation” should, in fact, be _global_. Distributed between independent organizations and actors who can self-govern. A public utility, without incentives to exploit the conversations for profit.
>
> -- Eugen Rochko, Mar 3 2018, ["Twitter is not a public utility"](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### 他のソフトウェアとの相互運用性 {#interoperability}

例えば、もしTwitterアカウントからInstagramのユーザーをフォローして、そこからコメントできたら…。TwitterとInstagramがもし連合サービスで同じプロトコルを使っていれば、可能かもしれません。Mastodonアカウントでは**他の互換性のあるサーバーと相互に通信できます。それが例えMastodonでなくとも。**そのソフトウェアがActivityPubプロトコルで投稿をしたり確認できたりするのと同じサブセットをサポートしてさえいればいいのです。Mastodonとの相互運用性についての技術的な話は、[ActivityPub](spec/activitypub.md)、[WebFinger](spec/webfinger.md)、[Security](spec/security.md)を見てください。

> All of these platforms are different and they focus on different needs. And yet, the foundation is all the same: people subscribing to receive posts from other people. And so, they are all compatible.
>
> -- Eugen Rochko, Jun 27 2018, ["Why ActivityPub is the future"](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### 無料で自由なソフトウェア {#libre}

プロプライエタリなサービスとは違って、**誰でも、完全に自由にmastodonのソースコードを実行、試験、検証、コピー、修正、頒布、再利用することができます。ただ、誰でも派生物と同じ自由を保証するものでなければなりません。** Mastodonのユーザーがサービスプロバイダを選ぶのと一緒で、個人的に自由にMastodonに機能を提供し、または違う機能を持ったMastodonの別バージョンを作ったりすることができます。このような別バージョンは一般にフォークと呼ばれますが、フォークソフトウェアもオリジナルなMastodonプロジェクトと同様の自由を保証しなければなりません。例えば、[glitch-soc](https://glitch-soc.github.io/docs/)は様々な実験的機能を備えたフォークがあります。他にも多くの個人がフォークしていて、それらは小さなテーマ変更だったりコード変更だったりします。Mastodonは自由ソフトウェアで、自由を尊重するので、このような個人化は許可されるだけでなく奨励されます。

> The ultimate power is in giving people the ability to create their own spaces, their own communities, to modify the software as they see fit, but without sacrificing the ability of people from different communities to interact with each other.
>
> -- Eugen Rochko, Feb 20 2017, ["The power to build communities: A response to Mark Zuckerberg"](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> Decentralization is biodiversity of the digital world, the hallmark of a healthy ecosystem. A decentralized network like the fediverse allows different user interfaces, different software, different forms of government to co-exist and cooperate.
>
> -- Eugen Rochko, Dec 30 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## 次のステップ {#next-steps}

Mastodonの使い方

{{< page-ref page="user/signup.md" >}}

Mastodonを建てる

{{< page-ref page="admin/prerequisites.md" >}}

Mastodonアプリを作る

{{< page-ref page="client/intro.md" >}}

Mastodonのバックエンドとコントリビューションについて学ぶ

{{< page-ref page="dev/overview.md" >}}



