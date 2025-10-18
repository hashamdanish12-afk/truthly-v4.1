import Head from 'next/head'
import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import rssSources from '../rssSources'
import { useEffect, useState } from 'react'

export default function Home({ theme, toggleTheme }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const all = []
      const sources = rssSources.global.concat(rssSources.trending).slice(0,6)
      for(const s of sources){
        try{
          const res = await fetch(`/api/rss?url=${encodeURIComponent(s.url)}`)
          const j = await res.json()
          if(j.ok && j.items) all.push(...j.items.map(it=>({...it,source:s.name})))
        }catch(e){}
      }
      const sorted = all.sort((a,b)=> new Date(b.pubDate||0)-new Date(a.pubDate||0))
      setItems(sorted.slice(0,40))
      setLoading(false)
    }
    load()
  },[])

  return (
    <>
      <Head>
        <title>Truthly — Unfiltered News</title>
        <meta name="description" content="Truthly — uncensored, independent news and trends for Gen Z"/>
        <meta property="og:title" content="Truthly"/>
      </Head>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="container">
        <h1 className="page-title">For You</h1>
        {loading && <div className="muted">Loading live stories...</div>}
        <section className="feed">
          {items.length===0 && !loading && <div className="muted">No live stories right now — showing sample content.</div>}
          {items.slice(0,30).map((it,i)=>(<NewsCard key={i} item={it}/>))}
        </section>
      </main>
    </>
  )
}
