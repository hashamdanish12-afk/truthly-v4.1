import Head from 'next/head'
import Navbar from '../../components/Navbar'
import NewsCard from '../../components/NewsCard'
import rssSources from '../../rssSources'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CountryPage({ theme, toggleTheme }){
  const router = useRouter()
  const { code } = router.query
  const [items,setItems]=useState([])
  useEffect(()=>{
    async function load(){
      if(!code) return
      const list = rssSources[code] || rssSources.global
      const all=[]
      for(const s of list){
        try{
          const res=await fetch(`/api/rss?url=${encodeURIComponent(s.url)}`)
          const j=await res.json()
          if(j.ok && j.items) all.push(...j.items.map(it=>({...it,source:s.name})))
        }catch(e){}
      }
      const sorted = all.sort((a,b)=> new Date(b.pubDate||0)-new Date(a.pubDate||0))
      setItems(sorted.slice(0,60))
    }
    load()
  },[code])
  return (
    <>
      <Head><title>Country - {code || 'Global'}</title></Head>
      <Navbar />
      <main className='container'>
        <h1 className='page-title'>Top stories — {code}</h1>
        <section className='feed'>{items.map((it,i)=><NewsCard key={i} item={it}/>)}</section>
      </main>
    </>
  )
}
