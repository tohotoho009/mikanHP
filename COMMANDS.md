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
