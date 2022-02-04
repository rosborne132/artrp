import Link from 'next/link'

export default function ({ user, loading }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Draw-App</a>
            </Link>
          </li>
          {!loading &&
            (user ? (
              <>
                <li>
                  <a href="/api/auth/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/api/auth/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>

      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:nth-child(1) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  )
}
