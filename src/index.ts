import { build } from './server'
import Logger from './logger'
import config from './config'
import mongodb from './db'

const logger = Logger.withScope('application').withTag('start')

export async function serve(): Promise<void> {
  const f = await build()

  await f.listen(config.port, '0.0.0.0')
  logger.info(`Application started listening on port=${config.port}`)

  await mongodb.connect()
}

serve().catch((error) => logger.error(error))

