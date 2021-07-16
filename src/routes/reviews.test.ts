import { randomUUID } from 'crypto'
import mongodb from '../db'
import { Response } from './reviews'
import Logger from '../logger'

beforeAll(function (){
  Logger.pauseLogs()
  return mongodb.connect()
})

afterAll(function () {
  return mongodb.disconnect()
})

describe('reviews', () => {
  test('should return 404 on not found', async () => {
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().get(`/reviews/${randomUUID()}`)
    expect(response.statusCode).toEqual(404)
  })

  test('should return reviews of an id', async () => {
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().get(`/reviews/10006546`)

    expect(response.statusCode).toEqual(200)
    const { rows } = await response.json<Promise<Response>>()
    expect(rows.length).toBeGreaterThan(0)

    for (const entry of rows) {
      expect(entry.listing_id).toEqual('10006546')
    }
  })
})
