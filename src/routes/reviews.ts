import { FastifyInstance } from 'fastify'
import mongodb from '../db'

interface IParams {
  id: string
}

export interface Review {
  _id: string
  date: Date
  listing_id: string
  reviewer_id: string
  reviewer_name: string
  comments: string
}

export interface Response {
  rows: Review[]
}

export default function(f: FastifyInstance): void {
  f.get<{ Params: IParams }>('/reviews/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            rows: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  date: { type: 'string' },
                  listing_id: { type: 'string' },
                  reviewer_id: { type: 'string' },
                  reviewer_name: { type: 'string' },
                  comments: { type: 'string' },
                },
                required: ['_id', 'date', 'listing_id', 'reviewer_id', 'reviewer_name', 'comments']
              }
            }
          }
        }
      }
    }
  },
  async function({ params }, reply) {
    const [listing] = await mongodb.collection.find({ _id: { $eq: params.id }}).toArray()

    if (!listing) {
      return reply.callNotFound()
    }

    return { rows: listing.reviews }
  })
}
