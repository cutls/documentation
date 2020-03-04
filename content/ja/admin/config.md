---
title: 環境設定
description: .env.productionの設定方法
menu:
  docs:
    weight: 30
    parent: admin
---

{{< hint style="warning" >}}
作成中
{{< /hint >}}

Mastodonは環境変数をMastodonの設定として利用します。

For convenience, it can read them from a flat file called `.env.production` in the Mastodon directory, but they can always be overridden by a specific process. For example, systemd service files can read environment variables from an `EnvironmentFile` or from inline definitions with `Environment`, so you can have different configuration parameters for specific services. They can also be specified when calling Mastodon from the command line.
簡便のため、Mastodonディレクトリ内の`.env.production`と呼ばれるテキストファイルから環境変数を読み取ります。しかし、これはいつでも特定のプロセスによって上書きされる可能性があります。例えば、systemdサービスは`EnvironmentFile`(ファイル)や`Environment`(インライン定義)から環境変数を取得することができます。そのため、特定のサービスに対して異なる構成パラメーターを使用できます。 コマンドラインからMastodonを呼び出すときにも指定できます。

## 一般 {#basic}

### 連合 {#federation}

* `LOCAL_DOMAIN`
* `WEB_DOMAIN`
* `ALTERNATE_DOMAINS`

#### `AUTHORIZED_FETCH` {#authorized_fetch}

  `true`に設定すると、Mastodonは内部で署名しなくなります。そして公開ないし未収載トゥートを取得するときには外部サーバによる認証を要求します。
  
  つまりブロックしているドメインに公開トゥートを取得させないようにできますが、計算量が増大します。また、Mastodon 3.0以前などフェッチリクエストに署名しないソフトウェアとの互換性を失います。
  
  そして、`true`に設定すると悪意あるアクターが公開トゥートをや未収載トゥートにアクセスしないということを保証できません。

#### `WHITELIST_MODE` {#whitelist_mode}

  `true`に設定すると、Mastodonはホワイトリストに登録されたサーバ意外と連合しません。また、公開ページや一部のクライアントAPIが無効化されます。つまり、事実上ホワイトリストモードは認可制取得モードということです。
  
  インスタンスをホワイトリストに移行するためには、以下のコマンドを実行しホワイトリストに登録されていないドメインによるデータを削除してください。
  ```
  tootctl domain purge --whitelist-mode
  ```
  
  `WHITELIST_MODE`はMastodon 3.0で追加されましたが、Mastodon 3.0, 3.0.1では使用できません。

### シークレット {#secrets}

* `SECRET_KEY_BASE`
* `OTP_SECRET`
* `VAPID_PRIVATE_KEY`
* `VAPID_PUBLIC_KEY`

### デプロイ {#deployment}

* `RAILS_ENV`
* `RAILS_SERVE_STATIC_FILES`
* `RAILS_LOG_LEVEL`
* `TRUSTED_PROXY_IP`
* `SOCKET`
* `PORT`
* `NODE_ENV`
* `BIND`

### スケーリング {#scaling}

* `WEB_CONCURRENCY`
* `MAX_THREADS`
* `PREPARED_STATEMENTS`
* `STREAMING_API_BASE_URL`
* `STREAMING_CLUSTER_NUM`

## データベースとの接続 {#connections}

### PostgreSQL {#postgresql}

* `DB_HOST`
* `DB_USER`
* `DB_NAME`
* `DB_PASS`
* `DB_PORT`
* `DATABASE_URL`

### Redis {#redis}

* `REDIS_HOST`
* `REDIS_PORT`
* `REDIS_URL`
* `REDIS_NAMESPACE`
* `CACHE_REDIS_HOST`
* `CACHE_REDIS_PORT`
* `CACHE_REDIS_URL`
* `CACHE_REDIS_NAMESPACE`

### ElasticSearch {#elasticsearch}

* `ES_ENABLED`
* `ES_HOST`
* `ES_PORT`
* `ES_PREFIX`

### StatsD {#statsd}

* `STATSD_ADDR`
* `STATSD_NAMESPACE`

## 制限 {#limits}

* `SINGLE_USER_MODE`
* `EMAIL_DOMAIN_WHITELIST`
* `DEFAULT_LOCALE`
* `MAX_SESSION_ACTIVATIONS`
* `USER_ACTIVE_DAYS`

## メール配信 {#email}

* `SMTP_SERVER`
* `SMTP_PORT`
* `SMTP_LOGIN`
* `SMTP_PASSWORD`
* `SMTP_FROM_ADDRESS`
* `SMTP_DOMAIN`
* `SMTP_DELIVERY_METHOD`
* `SMTP_AUTH_METHOD`
* `SMTP_CA_FILE`
* `SMTP_OPENSSL_VERIFY_MODE`
* `SMTP_ENABLE_STARTTLS_AUTO`
* `SMTP_TLS`

## ファイルストレージ {#cdn}

* `CDN_HOST`
* `S3_ALIAS_HOST`

### ローカル {#paperclip}

* `PAPERCLIP_ROOT_PATH`
* `PAPERCLIP_ROOT_URL`

### S3互換 {#s3}

* `S3_ENABLED`
* `S3_BUCKET`
* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `S3_REGION`
* `S3_PROTOCOL`
* `S3_HOSTNAME`
* `S3_ENDPOINT`
* `S3_SIGNATURE_VERSION`

### Swift {#swift}

* `SWIFT_ENABLED`
* `SWIFT_USERNAME`
* `SWIFT_TENANT`
* `SWIFT_PASSWORD`
* `SWIFT_PROJECT_ID`
* `SWIFT_AUTH_URL`
* `SWIFT_CONTAINER`
* `SWIFT_OBJECT_URL`
* `SWIFT_REGION`
* `SWIFT_DOMAIN_NAME`
* `SWIFT_CACHE_TTL`

## 外部認証 {#external-authentication}

* `OAUTH_REDIRECT_AT_SIGN_IN`

### LDAP {#ldap}

* `LDAP_ENABLED`
* `LDAP_HOST`
* `LDAP_PORT`
* `LDAP_METHOD`
* `LDAP_BASE`
* `LDAP_BIND_DN`
* `LDAP_PASSWORD`
* `LDAP_UID`
* `LDAP_SEARCH_FILTER`

### PAM {#pam}

* `PAM_ENABLED`
* `PAM_EMAIL_DOMAIN`
* `PAM_DEFAULT_SERVICE`
* `PAM_CONTROLLED_SERVICE`

### CAS {#cas}

* `CAS_ENABLED`
* `CAS_URL`
* `CAS_HOST`
* `CAS_PORT`
* `CAS_SSL`
* `CAS_VALIDATE_URL`
* `CAS_CALLBACK_URL`
* `CAS_LOGOUT_URL`
* `CAS_LOGIN_URL`
* `CAS_UID_FIELD`
* `CAS_CA_PATH`
* `CAS_DISABLE_SSL_VERIFICATION`
* `CAS_UID_KEY`
* `CAS_NAME_KEY`
* `CAS_EMAIL_KEY`
* `CAS_NICKNAME_KEY`
* `CAS_FIRST_NAME_KEY`
* `CAS_LAST_NAME_KEY`
* `CAS_LOCATION_KEY`
* `CAS_IMAGE_KEY`
* `CAS_PHONE_KEY`

### SAML {#saml}

* `SAML_ENABLED`
* `SAML_ACS_URL`
* `SAML_ISSUER`
* `SAML_IDP_SSO_TARGET_URL`
* `SAML_IDP_CERT`
* `SAML_IDP_CERT_FINGERPRINT`
* `SAML_NAME_IDENTIFIER_FORMAT`
* `SAML_CERT`
* `SAML_PRIVATE_KEY`
* `SAML_SECURITY_WANT_ASSERTION_SIGNED`
* `SAML_SECURITY_WANT_ASSERTION_ENCRYPTED`
* `SAML_SECURITY_ASSUME_EMAIL_IS_VERIFIED`
* `SAML_ATTRIBUTES_STATEMENTS_UID`
* `SAML_ATTRIBUTES_STATEMENTS_EMAIL`
* `SAML_ATTRIBUTES_STATEMENTS_FULL_NAME`
* `SAML_ATTRIBUTES_STATEMENTS_FIRST_NAME`
* `SAML_ATTRIBUTES_STATEMENTS_LAST_NAME`
* `SAML_UID_ATTRIBUTE`
* `SAML_ATTRIBUTES_STATEMENTS_VERIFIED`
* `SAML_ATTRIBUTES_STATEMENTS_VERIFIED_EMAIL`

## 秘匿サービス {#hidden-services}

* `http_proxy`
* `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## その他 {#other}

* `SKIP_POST_DEPLOYMENT_MIGRATIONS`

