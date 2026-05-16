export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, people, date, time, contact, notes } = req.body ?? {};

  if (!name || !people || !date || !time || !contact) {
    return res.status(400).json({ error: '必須項目が未入力です' });
  }

  const text = [
    '📋 予約リクエスト',
    `名前　: ${name}`,
    `人数　: ${people}名`,
    `希望日: ${date}`,
    `時間　: ${time}`,
    `連絡先: ${contact}`,
    `備考　: ${notes || 'なし'}`,
  ].join('\n');

  const response = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: process.env.LINE_OWNER_USER_ID,
      messages: [{ type: 'text', text }],
    }),
  });

  if (!response.ok) {
    console.error('LINE error:', await response.text());
    return res.status(500).json({ error: 'LINE送信エラー' });
  }

  return res.status(200).json({ ok: true });
}
