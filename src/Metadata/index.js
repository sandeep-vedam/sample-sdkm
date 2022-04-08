let metadata= {}

export const initMetadata = metadataObj => {
  metadata = metadataObj
}

export default {
  get(key, fallback = undefined) {
    return key in metadata ? metadata[key] : fallback
  },
  appId() {
    return this.get('id')
  },
  safeAppId() {
    return this.get('id').replace(/[^0-9a-zA-Z_$]/g, '_')
  },
  appName() {
    return this.get('name')
  },
  appVersion() {
    return (this.get('version') || '').split('-').shift()
  },
  appIcon() {
    return this.get('icon')
  },
  // Version from app store (with commit hash)
  appFullVersion() {
    return this.get('version')
  },
}
