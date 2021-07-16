import { Collection, MongoClient } from 'mongodb'
import Logger from '../logger'
import config from '../config'

/**
 * @class
 * @description MongoDB connection handler class
 */
class Mongo {
  /**
   * @private
   * @param {mongoose} client - Mongoose client
   */
  private client!: MongoClient

  /**
   * @private
   * @param {Logger} logger - Internal logger instance
   */
  private logger: typeof Logger = Logger.create({}).withScope('Mongo')

  /**
   * @function connect
   * @description Connect to Mongo
   *
   * @example
   *  import mongo from './db'
   *  await mongo.connect()
   */
  async connect(url = config.mongo_url) {
    if (this.client) { return }

    this.client = new MongoClient(url)
    this.bindEvents()
    await this.client.connect()
    this.logger.info('Mongo connection successful.')
  }

  async disconnect() {
    return this.client?.close()
  }

  /**
   * @private
   * @function bindEvents
   * @description Binds to mongodb connections
   */
  private bindEvents() {
    this.client.on('connectionReady', () => this.logger.debug('connectionReady'))
    this.client.on('connectionClosed', () => this.logger.debug('connectionClosed'))
    this.client.on('error', (error) => this.logger.error('error', error))
  }

  get collection(): Collection {
    return this.client.db('sample_airbnb').collection('listingsAndReviews')
  }
}

export default new Mongo()
