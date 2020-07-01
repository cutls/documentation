---
title: その他の設定
description: 他のユーザーを招待したり、フォローを整理したり、アカウントのセキュリティを向上させたり…
menu:
  docs:
    weight: 80
    parent: user
---

## 招待を作成 {#invites}

{{< figure src="/assets/image%20%2862%29.png" caption="アカウント設定から招待を作成" >}}

招待リンクを作成して他の人とシェアしましょう。一部のサーバは登録するのに招待を必要とします。招待リンクを作成する差異には、使用回数に制限をかけたり、
有効期限を設定できたりします。招待リンクはいつでも無効化できます。

## Follows and followers {#relationships}

{{< figure src="/assets/image%20%2849%29.png" caption="Mutuals who have not moved their account, sorted by last activity" >}}

Within settings, you can find a relationship manager that lets you filter and sort through the profiles that you are connected to, based on different criteria:

* **Relationship:** whether a profile is following you, followed by you, or mutually following each other.
* **Account status:** whether a profile is currently marked as redirected or not.
* **Account activity:** whether a profile has posted in the past month or not.

You can select certain users to unfollow, or to remove from your followers, by checking the boxes and clicking the corresponding button in the table header.

## Account settings {#account}

From the account settings, you can change your email address, set a new password, revoke active sessions or authorized apps, and enable two-factor authentication.

## Identity proofs {#proofs}

[Link verification](profile.md#link-verification) of profile metadata fields is one way to prove your identity by using rel=me links, but Mastodon also supports a more generalized proof provider subsystem. Currently, the only supported identity provider for this subsystem is Keybase.

### Keybase identity verification {#keybase}

{{< figure src="/assets/image%20%2860%29.png" caption="An identity proof on a profile" >}}

First, sign up for Keybase and generate or upload a GPG public key to your Keybase account. Next, go to "prove more identities". Find your instance if it is available, and if not, contact Keybase for help. Select your Mastodon domain and enter your username. You will be able to prove your identity by authorizing with your Mastodon account and posting a proof message. Once you do this, the identity proof will be established, and your profile will show Keybase as a proven identity.

{{< hint style="danger" >}}
**Keybase verification is irreversible.** Keybase uses an immutable signature chain for its identity proofs, so once you prove your identity on Keybase, you cannot remove it. You can only revoke your proof by signing a revocation message with your associated private key.
{{< /hint >}}

