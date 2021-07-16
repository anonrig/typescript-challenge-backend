import mongodb from '../db'
import { Response } from './stays'
import Logger from '../logger'

beforeAll(function () {
  Logger.pauseLogs()
  return mongodb.connect()
})

afterAll(function () {
  return mongodb.disconnect()
})

describe('stays', () => {
  test('should return all listings that have 3 bedrooms.', async () => {
    const body = { bedrooms: 3 }
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().post('/stays').body(body)

    expect(response.statusCode).toEqual(200)
    const { rows } = await response.json<Promise<Response>>()
    expect(rows.length).toBeGreaterThan(0)

    for (const entry of rows) {
      expect(entry.bedrooms).toEqual(body.bedrooms)
    }
  })

  test('return all listings that have 2 bedrooms and 2 bathrooms', async () => {
    const body = { bedrooms: 2, bathrooms: 2 }
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().post('/stays').body(body)

    expect(response.statusCode).toEqual(200)
    const { rows } = await response.json<Promise<Response>>()
    expect(rows.length).toBeGreaterThan(0)

    for (const entry of rows) {
      expect(entry.bedrooms).toEqual(body.bedrooms)
      expect(entry.bathrooms).toEqual({"$numberDecimal": "2.0"})
    }
  })

  test('return all listings that have 4 bedrooms, 3 beds, and 3 bathrooms.', async () => {
    const body = { bedrooms: 4, bathrooms: 3, beds: 3 }
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().post('/stays').body(body)

    expect(response.statusCode).toEqual(200)
    const { rows } = await response.json<Promise<Response>>()

    for (const entry of rows) {
      expect(entry.bedrooms).toEqual(body.bedrooms)
      expect(entry.bathrooms).toEqual({"$numberDecimal": "3.0"})
      expect(entry.beds).toEqual({"$numberDecimal": "3.0"})
    }
  })

  test('return all listings that have "Wifi", a "Kitchen", and a "Washer"', async () => {
    const body = { amenities: ['Wifi', 'Kitchen', 'Washer'] }
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().post('/stays').body(body)

    expect(response.statusCode).toEqual(200)
    const { rows } = await response.json<Promise<Response>>()

    for (const entry of rows) {
      for (const amenity of body.amenities) {
        expect(entry.amenities.includes(amenity)).toBeTruthy()
      }
    }
  })

  test('return all listings that have "Wifi" and 3 bedrooms.', async () => {
    const body = { amenities: ['Wifi'], bedrooms: 3 }
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().post('/stays').body(body)

    expect(response.statusCode).toEqual(200)
    const { rows } = await response.json<Promise<Response>>()

    for (const entry of rows) {
      expect(entry.bedrooms).toEqual(body.bedrooms)
      for (const amenity of body.amenities) {
        expect(entry.amenities.includes(amenity)).toBeTruthy()
      }
    }
  })

  test('should paginate through cursors', async () => {
    const body = {}
    const { build } = await import('../server')
    const f = await build()
    const response = await f.inject().post('/stays').body(body)
    expect(response.statusCode).toEqual(200)
    const { cursor, rows } = await response.json<Promise<Response>>()
    expect(cursor).toBeTruthy()

    const second_response = await f.inject().post('/stays').body(Object.assign({}, body, { cursor }))
    expect(response.statusCode).toEqual(200)
    const { rows: second_rows } = await second_response.json()
    expect(second_rows[0]._id !== rows[0]._id).toBeTruthy()
  })
})
