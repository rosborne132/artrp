import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'

// Components
import Layout from '../components/layout'
import { ProfileCard } from '../components/profileCard'

// Utilities
import { fetcher } from '../lib'

export default withPageAuthRequired(function App() {
  const { user, isLoading } = useUser()
  const [skills, setSkills] = React.useState({})
  const [showModal, setShowModal]: any = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  // TODO: Move dynamo table to AWS CDK

  // TODO: Clean up api

  // TODO: Clean up turbo repo

  const getSkills = async () => {
    try {
      const userSkills = await axios.get(`/api/skills/${user.sub}`)
      return userSkills.data
    } catch (error) {
      console.log('statusCode: ', error.response.status)
      console.log('statusText: ', error.response.statusText)
      return {}
    }
  }

  const createSkills = async () => {
    try {
      const newUserSkills = await axios.post(`/api/skills/${user.sub}`)
      return newUserSkills.data
    } catch (error) {
      console.log('statusCode: ', error.response.status)
      console.log('statusText: ', error.response.statusText)
      return {}
    }
  }

  const getSkillsOnLoad = async () => {
    const userSkills = await getSkills()

    if (Object.keys(userSkills).length === 0) {
      const newUserSkills = await createSkills()
      return newUserSkills
    }

    return userSkills
  }

  React.useEffect(() => {
    getSkillsOnLoad().then((data) => {
      setSkills(data)
      setLoading(Object.keys(data).length === 0)
    })
  }, [])

  const images = []

  if (loading) return <div>Loading...</div>

  return (
    <Layout user={user} loading={isLoading}>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <header>
            <h1>App Dashboard</h1>
          </header>
          <Modal isOpen={showModal}>
            <h2>Add New Image</h2>
            <button onClick={() => setShowModal(false)}>Upload Image</button>
          </Modal>
          <ProfileCard user={user} />

          <h2>Skills</h2>
          {/*           {skills.map((skill) => ( */}
          {/*             <h4 key={skill.id}>{skill.title}</h4> */}
          {/*           ))} */}

          <h2>Latest Artwork</h2>
          {images.map((skill) => (
            <h4 key={skill.id}>{skill.imageUrl}</h4>
          ))}

          <button onClick={() => setShowModal(true)}>Upload Image</button>
        </>
      )}
    </Layout>
  )
})
