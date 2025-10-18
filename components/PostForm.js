import { useState } from 'react'

export default function PostForm(){
  const [title,setTitle]=useState('')
  const [link,setLink]=useState('')
  const [cat,setCat]=useState('general')
  const [msg,setMsg]=useState('')
  function submit(e){e.preventDefault()
    // store locally for now
    const posts = JSON.parse(localStorage.getItem('truthly:posts')||'[]')
    posts.unshift({title,link,cat,ts:Date.now()})
    localStorage.setItem('truthly:posts', JSON.stringify(posts))
    setMsg('Submitted locally — will appear after refresh.')
    setTitle(''); setLink('')
  }
  return (
    <form onSubmit={submit} className='post-form'>
      <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} required/></label>
      <label>Link (optional)<input value={link} onChange={e=>setLink(e.target.value)}/></label>
      <label>Category<select value={cat} onChange={e=>setCat(e.target.value)}><option value='general'>General</option><option value='genz'>Gen Z</option><option value='sports'>Sports</option></select></label>
      <button type='submit' className='btn'>Submit</button>
      {msg && <div className='muted'>{msg}</div>}
    </form>
  )
}
