# 使い方:
#   ./deploy.ps1              → コミットメッセージは自動生成
#   ./deploy.ps1 "メニュー更新"  → メッセージを指定

param([string]$msg = "")

if (-not $msg) {
    $msg = "update " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

$status = git status --porcelain
if (-not $status) {
    Write-Host "変更なし。デプロイ不要です。"
    exit 0
}

git add .
git commit -m $msg
git push origin master

Write-Host ""
Write-Host "プッシュ完了: $msg"
Write-Host "GitHub Actions が自動でVercelにデプロイします。"
Write-Host "進捗: https://github.com/tohotoho009/mikanHP/actions"
