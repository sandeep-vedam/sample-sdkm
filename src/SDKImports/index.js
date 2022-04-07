import { initMetrics } from '../Metrics'
import { initMetadata } from '../Metadata'

//export default (settings, log, application, launch, lightning) {
//
// }
console.log('Inside Metrics file of index metro-sdk')
export default (App, appSettings, platformSettings, appData, settings, log) => {
  initMetadata(appSettings)
  // Initialize plugins
  initMetrics(platformSettings.plugins.metrics, log)
}
