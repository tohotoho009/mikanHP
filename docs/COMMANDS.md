# コマンド集

## 日常の更新・デプロイ（これだけ覚えればOK）

```powershell
# ファイルを変更したら、このコマンド1つで git 保存 → Vercel 自動デプロイ
./deploy.ps1

# コミットメッセージを指定したい場合
./deploy.ps1 "メニュー更新"
./deploy.ps1 "営業時間変更"
```

デプロイの進捗確認: https://github.com/tohotoho009/mikanHP/actions

**本番URL：** https://mikan-hp.vercel.app

---

## メニューPDF の更新

1. `menu.pdf` を新しいファイルで上書きする
2. `./deploy.ps1 "メニューPDF更新"` を実行

**公開URL：** https://mikan-hp.vercel.app/menu.pdf

---

## PDF生成（品書き）

```bash
# menu/menu.html → menu.pdf を再生成
node menu/gen-pdf.js
```

出力先：`menu.pdf`（本番URL: https://mikan-hp.vercel.app/menu.pdf）

メニュー内容・価格を変更したい場合は `menu/menu.html` を編集してから実行する。

### 印刷時の注意

PDF のページサイズは正確に **119×261mm** で出力されている。
印刷時に拡大されて見える場合は PDF 閲覧ソフトの設定を確認すること。

| ソフト | 設定 |
|---|---|
| Adobe Acrobat | 印刷 → サイズ → **「実際のサイズ」** |
| Chrome / ブラウザ | 印刷 → 拡大縮小 → **「なし」** |
| コンビニ印刷機 | 用紙サイズをカスタム（109×251mm）で指定 |

---

## PDF生成（ポスター）

```bash
# poster-landscape-light.html → PDF出力
node posters/gen-pdf.js
```

出力先：`posters/poster-landscape-light.pdf`

---

## Instagram ギャラリー自動同期の初期設定

Instagram の最新投稿がギャラリーに自動反映されるようにするための1回限りの設定。

### 前提条件
- `@wabarmikan` が **ビジネスアカウントまたはクリエイターアカウント** であること
  （個人アカウントの場合：Instagram設定 → アカウント → プロフェッショナルアカウントに切り替え）
- Facebookページと連携済みであること

### Step 1 — Facebook Developer App を作成

1. https://developers.facebook.com/ を開く
2. 「マイアプリ」→「アプリを作成」→「その他」→「ビジネス」
3. アプリ名（例: `mikan-instagram`）を入力して作成

### Step 2 — Instagram Graph API を追加

1. 作成したアプリのダッシュボードで「製品を追加」
2. 「Instagram Graph API」を追加
3. 左メニュー「Instagram Graph API」→「設定」→「ベーシック表示」を有効化

### Step 3 — アクセストークンを取得

1. Facebookアプリの「ツール」→「グラフAPIエクスプローラー」を開く
2. 右上のドロップダウンで作成したアプリを選択
3. 「アクセストークンを生成」→ `instagram_business_basic` にチェック
4. 生成されたトークンをコピー（短期トークン・1時間有効）

### Step 4 — 長期トークンに交換（60日有効）

```bash
# APP_ID と APP_SECRET は Facebook Developer ダッシュボードで確認
curl "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_id={APP_ID}
  &client_secret={APP_SECRET}
  &access_token={短期トークン}"
```

返ってきた `access_token` をコピー。

### Step 5 — Vercel に環境変数を設定

```bash
vercel env add INSTAGRAM_ACCESS_TOKEN production
# プロンプトにトークンを貼り付けてEnter
vercel --prod
```

### 動作確認

https://mikan-hp.vercel.app にアクセスして、ギャラリーが Instagram の最新投稿に切り替われば完了。

### トークンの自動更新について

GitHub Actions の `refresh-instagram-token.yml` が **毎月1日に自動実行** され、
トークンの有効期限（60日）を延長・Vercel を自動デプロイします。
設定後は手動管理不要。

---

## 予約フォーム LINE通知の初期設定

予約フォームからLINEに通知が届くには、2つの環境変数が必要です。

### Step 1 — LINE Messaging APIチャネルを作成

1. https://developers.line.biz/ を開き、LINEアカウントでログイン
2. 「プロバイダー作成」→ 名前（例: `mikan`）
3. 「チャネル作成」→「Messaging API」を選択
4. チャネル名（例: `未完予約bot`）・説明を入力して作成
5. 「Messaging API設定」タブ →「チャネルアクセストークン」→「発行」→ **コピーして保存**

### Step 2 — オーナーにBotを友だち追加してもらう

1. 同じページの「Messaging API設定」タブにあるQRコードをオーナーに送る
2. オーナーがQRコードを読み取って友だち追加する
3. オーナーがBotに「よろしく」など何でもメッセージを送ってもらう

### Step 3 — オーナーのUser IDを取得する

1. LINE Developersの「Messaging API設定」→「Webhook URL」に以下を設定:
   `https://mikan-hp.vercel.app/api/line-webhook`
2. 「Webhookの利用」をONにする・「検証」ボタンで確認
3. オーナーがBotにメッセージを送ると、Vercelのログに User ID が出力される
4. Vercelのログ確認: https://vercel.com/tohotoho009-7306s-projects/mikan-hp/logs
   → `LINE User ID: Uxxxxxxxxxx` という行をコピー

### Step 4 — Vercel に環境変数を設定する

```bash
# Step 1で取得したトークン
vercel env add LINE_CHANNEL_ACCESS_TOKEN production

# Step 3で取得したUser ID
vercel env add LINE_OWNER_USER_ID production
```

または Vercel ダッシュボードの「Settings → Environment Variables」から追加してもOK。

### Step 5 — 動作確認して完了

```bash
# 環境変数を反映するため再デプロイ
vercel --prod
```

HPの予約フォームから送信してオーナーのLINEに届けば完了。
完了後、`api/line-webhook.js` は不要なので削除してよい。

---

## Google ビジネスプロフィールの開設手順

### Step 1 — アカウント作成・ログイン

1. https://business.google.com/ を開く
2. 店舗のGoogleアカウントでログイン

### Step 2 — ビジネスを登録

1. Googleマップで「未完 江古田」を検索
2. 「このビジネスのオーナーですか？」をクリック（既にページが存在している）
3. 「今すぐ管理」をクリック

### Step 3 — 基本情報を入力

| 項目 | 入力内容 |
|---|---|
| ビジネス名 | 未完 |
| カテゴリ | 焼き鳥店（メイン）、居酒屋（サブ） |
| 住所 | 東京都練馬区栄町4-9 |
| 営業時間 | 月〜日 17:00〜24:00 |
| ウェブサイト | https://mikan-hp.vercel.app |
| 電話番号 | 確認後に追加 |

### Step 4 — オーナー確認（認証）

Googleから本人確認が必要。方法はいくつかある：

- **電話・SMS** — 最速（番号が登録されている場合）
- **ハガキ** — 住所に確認コードが郵送される（1〜2週間）
- **ライブビデオ通話** — Googleスタッフと通話して確認

### Step 5 — 認証後にやること

- [ ] 写真を追加（外観・店内・料理を各3枚以上が目安）
- [ ] 説明文を入力（`CONTENT.md > Concept` の文章をベースに）
- [ ] メニュー・コース情報を登録
- [ ] 予約リンクに `https://www.instagram.com/wabarmikan/` を設定

### 運用ポイント

- **口コミへの返信**は必ずする（良い口コミにも）
- 営業時間・定休日は変わったら**すぐ更新**する（Googleマップに反映されるため）
- 写真は月1枚ペースで追加すると検索表示に有利

---

## 手動デプロイ（緊急時）

```bash
# GitHub を経由せず直接デプロイ
vercel --prod
```

---

## Vercel ログイン（初回 or トークン切れ時）

```bash
vercel login
vercel whoami   # ログイン確認
```

---

## GitHub Actions の設定（初回のみ・要セットアップ）

push → 自動デプロイが動くには、GitHub に3つのシークレットを登録する必要があります。

### 必要なシークレット

| シークレット名 | 値 |
|---|---|
| `VERCEL_ORG_ID` | `team_vTFuPsiTGnyCic86yVnZP91C` |
| `VERCEL_PROJECT_ID` | `prj_HaEpUg6dPWSvpDFqulPDFqgccNd6` |
| `VERCEL_TOKEN` | Vercel で発行したAPIトークン（下記手順） |

### Vercel トークンの発行手順

1. https://vercel.com/account/tokens を開く
2. 「Create Token」→ 名前（例: `github-actions`）→ 「Create」
3. 表示されたトークンをコピー（一度しか表示されない）

### GitHub シークレットの登録手順

1. https://github.com/tohotoho009/mikanHP/settings/secrets/actions を開く
2. 「New repository secret」を3回繰り返して上記3つを登録
