import Head from 'next/head'
import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import rssSources from '../rssSources'
import { useEffect, useState } from 'react'

export default function GenZ({ theme, toggleTheme }){
  const [items,setItems]=useState([])
  useEffect(()=>{
    async function load(){
      const all=[]
      for(const s of rssSources.genz){
        try{
          const res=await fetch(`/api/rss?url=${encodeURIComponent(s.url)}`)
          const j=await res.json()
          if(j.ok && j.items) all.push(...j.items.map(it=>({...it,source:s.name})))
        }catch(e){}
      }
      setItems(all.slice(0,80))
    }
    load()
  },[])
  return (
    <>
      <Head><title>Gen Z - Truthly</title></Head>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="container">
        <h1 className="page-title">Gen Z — What's Poppin'</h1>
        <section className="feed">{items.map((it,i)=><NewsCard key={i} item={it}/>)}</section>
      </main>
    </>
  )
}
