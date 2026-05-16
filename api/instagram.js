export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return res.status(500).json({ error: 'not configured' });

  const fields = 'id,caption,media_type,media_url,permalink';
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`
  );

  if (!response.ok) {
    console.error('Instagram API error:', await response.text());
    return res.status(500).json({ error: 'api error' });
  }

  const { data = [] } = await response.json();

  const posts = data
    .filter(p => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
    .slice(0, 6)
    .map(p => ({
      src:     p.media_url,
      href:    p.permalink,
      caption: (p.caption || '').split('\n')[0].replace(/#\S+/g, '').trim().slice(0, 20) || '料理',
    }));

  // 1時間キャッシュ、最大24時間 stale-while-revalidate
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ posts });
}
