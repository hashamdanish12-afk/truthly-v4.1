import { parseStringPromise } from 'xml2js';
import LRU from 'lru-cache';

const cache = new LRU({ max: 500, ttl: 1000 * 60 * 5 });

function normalizeItem(item) {
  const title = (item.title && item.title[0]) || '(no title)';
  const description = (item.description && item.description[0]) || (item['content:encoded'] && item['content:encoded'][0]) || '';
  const link = (item.link && item.link[0]) || (item.guid && item.guid[0]) || '';
  const pubDate = (item.pubDate && item.pubDate[0]) || (item.published && item.published[0]) || null;
  return { title, description, link, pubDate };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const feedUrl = req.query.url;
  if (!feedUrl) return res.status(400).json({ ok: false, error: "Missing 'url' query param" });

  try {
    const key = feedUrl;
    if (cache.has(key)) return res.status(200).json({ ok: true, cached: true, items: cache.get(key) });

    const response = await fetch(feedUrl, { headers: { 'User-Agent': 'Truthly-RSS-Proxy/1.0' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const xml = await parseStringPromise(text, { explicitArray: true, ignoreAttrs: false });

    let items = [];
    if (xml.rss && xml.rss.channel && xml.rss.channel[0] && xml.rss.channel[0].item) {
      items = xml.rss.channel[0].item.map(normalizeItem);
    } else if (xml.feed && xml.feed.entry) {
      items = xml.feed.entry.map((entry) => {
        const title = (entry.title && entry.title[0]) || '(no title)';
        const description = (entry.summary && entry.summary[0]) || (entry.content && entry.content[0]) || '';
        let link = '';
        if (entry.link && entry.link[0] && entry.link[0].$.href) link = entry.link[0].$.href;
        return { title, description, link, pubDate: (entry.published && entry.published[0]) || (entry.updated && entry.updated[0]) };
      });
    }

    const out = items.slice(0, 25).map((it) => ({ title: it.title, description: it.description, link: it.link, pubDate: it.pubDate }));
    cache.set(key, out);
    return res.status(200).json({ ok: true, cached: false, items: out });
  } catch (err) {
    console.error('/api/rss error:', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
