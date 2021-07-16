import Consola from 'consola'
import config from './config'

export default Consola.create({ level: config.is_ci ? 0 : 4 })
