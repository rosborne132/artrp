export const ProfileCard = ({ user }) => (
  <div>
    <img src={user?.picture} alt="user picture" />
    <p>nickname: {user?.nickname}</p>
    <p>name: {user?.name}</p>
  </div>
)
