import { useState, useEffect } from 'react'

function extractImageFromDescription(desc){
  if(!desc) return null
  const m = desc.match(/<img[^>]+src=['\"]([^'\"]+)['\"]/i)
  return m? m[1] : null
}

export default function NewsCard({ item }){
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  useEffect(()=>{
    const key = 'likes:'+ (item.link||item.title).slice(0,80)
    const stored = localStorage.getItem(key)
    if(stored) setLikes(parseInt(stored,10))
  },[item])
  function toggleLike(){
    const key = 'likes:'+ (item.link||item.title).slice(0,80)
    const newLikes = liked? Math.max(0, likes-1) : likes+1
    setLiked(!liked); setLikes(newLikes)
    localStorage.setItem(key, String(newLikes))
  }
  const img = item.enclosure || extractImageFromDescription(item.description) || item.thumbnail || null
  return (
    <article className="card">
      {img && <div className="thumb"><img src={img} alt=""/></div>}
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0,220) : ''}</p>
        <div className="card-foot">
          <a className="read" href={item.link|| '#'} target="_blank" rel="noreferrer">Read</a>
          <div className="engage">
            <button onClick={toggleLike} className={liked? 'liked':''}>👍 {likes}</button>
          </div>
        </div>
      </div>
    </article>
  )
}
