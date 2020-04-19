import merge from 'lodash.merge'
import auth from './auth'
import defaults from './defaults'
export default merge(auth, defaults)
