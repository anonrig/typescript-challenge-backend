import { FastifyInstance } from 'fastify'
import { Filter } from 'mongodb'
import mongodb from '../db'

interface IBody {
  bedrooms?: number
  beds?: number
  bathrooms?: number
  amenities: string[]
  cursor?: string
}

export interface Stay {
  _id: string
  bedrooms: number
  beds: number
  bathrooms: number
  amenities: string[]
  first_review: string
}

export interface Response {
  rows: Stay[]
  cursor?: string
}

export default function(f: FastifyInstance): void {
  f.post<{ Body: IBody }>('/stays', {
    schema: {
      body: {
        type: 'object',
        properties: {
          bedrooms: { type: 'number' },
          beds: { type: 'number' },
          bathrooms: { type: 'number' },
          amenities: { type: 'array', items: { type: 'string' }, default: [] },
          cursor: { type: 'string' },
        },
        required: []
      },
    }
  },
  async function({ body }) {
    const filter: Filter<Stay> = {}

    if (body.bedrooms) {
      filter.bedrooms = { $eq: body.bedrooms }
    }

    if (body.beds) {
      filter.beds = { $eq: body.beds }
    }

    if (body.bathrooms) {
      filter.bathrooms = { $eq: body.bathrooms }
    }

    if (body.amenities.length > 0) {
      filter.amenities = { $all: body.amenities }
    }

    if (body.cursor) {
      filter._id = { $gte: body.cursor }
    }

    const rows = await mongodb.collection.find(filter, {
      limit: 25,
      sort: [['_id', 1]]
    }).toArray()

    const cursor = rows.length > 0 ? rows[rows.length - 1]._id : null

    return { rows, cursor }
  })
}
