import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: 'https://skills-service-dev',
          scope: 'openid skill:create skill:delete skill:read skill:update',
        },
        returnTo: '/app',
      })
    } catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  },
})
