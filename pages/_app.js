import '../styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark')
  useEffect(()=>{
    const t = localStorage.getItem('truthly:theme') || 'dark'
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  },[])
  function toggle(){
    const t = theme === 'dark' ? 'light' : 'dark'
    setTheme(t)
    localStorage.setItem('truthly:theme', t)
    document.documentElement.setAttribute('data-theme', t)
  }
  return <Component {...pageProps} theme={theme} toggleTheme={toggle} {...pageProps} />
}
