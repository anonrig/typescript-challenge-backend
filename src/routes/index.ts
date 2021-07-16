import { FastifyInstance } from 'fastify'

import stays from './stays'
import reviews from './reviews'

export default function prepare(f: FastifyInstance): void {
  stays(f)
  reviews(f)
}
