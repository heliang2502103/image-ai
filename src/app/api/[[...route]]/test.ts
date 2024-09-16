import { Hono } from 'hono'
import {verifyAuth} from '@hono/auth-js'

// verifyAuth 中间件验证
const app = new Hono()
  .get('/', verifyAuth(),async (c) => {
    const auth = c.get('authUser')



      return c.json({ token:auth.token })
    }
  )

export default app