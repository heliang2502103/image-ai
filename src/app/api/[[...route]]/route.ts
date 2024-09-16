import { Hono, Context } from 'hono'
import { handle } from 'hono/vercel'
import images from './images'
import ai from './ai'
import users from './users'
import test from './test'
import { AuthConfig, initAuthConfig } from '@hono/auth-js'
import authConfig from '@/lib/auth.config'

export const runtime = 'nodejs'

function getAuthConfig(c:Context):AuthConfig {
  return {
    secret:c.env.AUTH_SECRET,
    ...authConfig
  }
}

const app = new Hono().basePath('/api')
// 验证中间件
app.use('*', initAuthConfig(getAuthConfig))

const routes = app.route('/images', images).route('/ai', ai).route('/users', users).route('/test', test)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
