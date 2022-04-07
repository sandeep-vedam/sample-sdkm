// import Log from '../Log'
import SDKImports from '../SDKImports'

let Log
export const initMetric = (config, log) => {
  sendMetric = config.sendMetric
  log = Log
  console.log('Log value is', log)
}
let sendMetric = (type, event, params) => {
  Log.info('Sending metric', type, event, params)
}

// available metric per category
const metrics = {
  app: ['launch', 'loaded', 'ready', 'close'],
  page: ['view', 'leave'],
  user: ['click', 'input'],
  media: [
    'abort',
    'canplay',
    'ended',
    'pause',
    'play',
    // with some videos there occur almost constant suspend events ... should investigate
    // 'suspend',
    'volumechange',
    'waiting',
    'seeking',
    'seeked',
  ],
}

// error metric function (added to each category)
const errorMetric = (type, message, code, visible, params = {}) => {
  params = { params, ...{ message, code, visible } }
  sendMetric(type, 'error', params)
}

const Metric = (type, events, options = {}) => {
  return events.reduce(
    (obj, event) => {
      obj[event] = (name, params = {}) => {
        params = { ...options, ...(name ? { name } : {}), ...params }
        sendMetric(type, event, params)
      }
      return obj
    },
    {
      error(message, code, params) {
        errorMetric(type, message, code, params)
      },
      event(name, params) {
        sendMetric(type, name, params)
      },
    }
  )
}

const Metrics = types => {
  return Object.keys(types).reduce(
    (obj, type) => {
      // media metric works a bit different!
      // it's a function that accepts a url and returns an object with the available metrics
      // url is automatically passed as a param in every metric
      type === 'media'
        ? (obj[type] = url => Metric(type, types[type], { url }))
        : (obj[type] = Metric(type, types[type]))
      return obj
    },
    { error: errorMetric, event: sendMetric }
  )
}

export default Metrics(metrics)
