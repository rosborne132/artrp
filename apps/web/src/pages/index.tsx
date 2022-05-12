import Layout from '../components/layout'
import { useUser } from '@auth0/nextjs-auth0'

export default function Home() {
  const { user, isLoading } = useUser()

  return (
    <Layout user={user} loading={isLoading}>
      <h1>Welcome to ArtPG</h1>
      <p>Gameify your art learning experience!</p>
    </Layout>
  )
}
