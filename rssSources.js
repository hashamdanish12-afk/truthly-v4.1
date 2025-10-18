// rssSources.js
const rssSources = {
  global: [
    { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
    { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews" },
    { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
    { name: "The Guardian", url: "https://www.theguardian.com/world/rss" },
    { name: "CNN", url: "http://rss.cnn.com/rss/edition_world.rss" }
  ],
  trending: [
    { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
    { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
    { name: "Reddit /r/worldnews", url: "https://www.reddit.com/r/worldnews/.rss" },
    { name: "NY Times - World", url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml" }
  ],
  genz: [
    { name: "Mashable", url: "https://mashable.com/feed/" },
    { name: "BuzzFeed News", url: "https://www.buzzfeed.com/world.xml" }
  ]
};

export default rssSources;
