import fastify, { FastifyInstance } from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import compress from 'fastify-compress'

import prepareRoutes from './routes'

export async function build(): Promise<FastifyInstance> {
  const f = fastify()

  f.register(helmet)
  f.register(cors)
  f.register(compress)

  prepareRoutes(f)

  return f
}
