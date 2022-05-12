import Head from 'next/head'
import Header from './header'

export default function Layout({ user, isLoading = false, children }) {
  return (
    <>
      <Head>
        <title>ArtPG</title>
      </Head>

      <Header user={user} loading={isLoading} />

      <main>
        <div className="container">{children}</div>
      </main>

      <style jsx>{`
        .container {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </>
  )
}
