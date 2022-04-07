import { initMetric } from '../Metrics'
import { initMetadatas } from '../Metadata'

//export default (settings, log, application, launch, lightning) {
//
// }
console.log('Inside Metrics file of index metro-sdk')
export default (App, appSettings, platformSettings, appData, settings, log) => {
  initMetadatas(appSettings)
  // Initialize plugins
  initMetric(platformSettings.plugins.metrics, log)
}
