import React from 'react'
import Modal from 'react-modal';

import Layout from '../components/layout'

import { useFetchUser } from '../lib/user'

function ProfileCard({ user }) {
  return (
      <div>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
  )
}

export default function App({ images, skills }) {
  const { user, loading } = useFetchUser({ required: true })
  const [ showModal, setShowModal ]: any = React.useState(false)

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : (
        <>
          <header>
            <h1>App Dashboard</h1>
          </header>
          <Modal
            isOpen={showModal}
          >
            <h2>Add New Image</h2>
            <button onClick={() => setShowModal(false)}>Upload Image</button>
          </Modal>
          <ProfileCard user={user} />

          <h2>Skills</h2>
          { skills.map(skill => <h4 key={skill.id}>{skill.title}</h4>) }

          <h2>Latest Artwork</h2>
          { images.map(skill => <h4 key={skill.id}>{skill.imageUrl}</h4>) }

          <button onClick={() => setShowModal(true)}>Upload Image</button>
        </>
      )}
    </Layout>
  )
}

App.getInitialProps = async () => {
  // Get Skills by userId
  const skills = [
    { id: 'gsdfbe-39-xsdf', title: 'design', level: 1, experiencePoints: 43 , experienceToNextLevel: 100 },
    { id: 'asdg-we3db-sd', title: 'color-light', level: 1, experiencePoints: 43 , experienceToNextLevel: 100 }
  ]

  // Get images
  const images = [
    { id: 'asdf-fn2jdf-asdf13tb', imageUrl: 'https://some-image-url.com' }
  ]

  return { images, skills }
}