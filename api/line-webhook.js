// オーナーのLINE User IDを取得するための一時的なWebhook
// User IDが取得できたらVercel環境変数に設定してこのファイルは削除してよい
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { events = [] } = req.body ?? {};
    for (const event of events) {
      const userId = event.source?.userId;
      if (userId) console.log('LINE User ID:', userId);
    }
  }
  res.status(200).end();
}
