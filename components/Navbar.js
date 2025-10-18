import Link from 'next/link';

export default function Navbar({theme, toggleTheme}){
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="left">
          <div className="logo"><Link href="/"><a>Truthly</a></Link></div>
          <nav className="site-nav">
            <Link href="/"><a>Home</a></Link>
            <Link href="/genz"><a>Gen Z</a></Link>
            <Link href="/trending"><a>Trending</a></Link>
            <Link href="/post"><a>Post</a></Link>
          </nav>
        </div>
        <div className="right">
          <Link href="/country/pakistan"><a>🇵🇰 Pakistan</a></Link>
          <Link href="/country/usa"><a>🇺🇸 USA</a></Link>
          <Link href="/country/india"><a>🇮🇳 India</a></Link>
          <Link href="/country/uk"><a>🇬🇧 UK</a></Link>
          <button className="theme-toggle" onClick={toggleTheme}>{theme==='dark'?'☀️':'🌙'}</button>
        </div>
      </div>
    </header>
  )
}
