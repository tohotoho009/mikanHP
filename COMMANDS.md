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

## PDF生成（ポスター）

```bash
# poster-landscape-light.html → PDF出力
node gen-pdf.js
```

出力先：`poster-landscape-light.pdf`（プロジェクトルート）

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
