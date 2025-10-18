import Head from 'next/head'
import Navbar from '../components/Navbar'
import PostForm from '../components/PostForm'

export default function Post({ theme, toggleTheme }){
  return (
    <>
      <Head><title>Post News - Truthly</title></Head>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className='container'>
        <h1 className='page-title'>Post your Truth</h1>
        <PostForm />
      </main>
    </>
  )
}
