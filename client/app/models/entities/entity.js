export const EntityType = Object.freeze({
  RECORDING: 0,
  RELEASE: 1,
  RELEASE_GROUP: 2,
  ARTIST: 3
})

export default class Entity {
  constructor(id, type) {
    this.id = id
    this.type = type
  }
}

export function showField(field) {
  // Don't show id fields
  return field.match(/ids?$/i) === null
}

export function isTimeField(field) {
  return field === 'length'
}

export function isNameField(field) {
  return field === 'name'
}

export function isLinkableField(field) {
  return field === 'artistNames' || field === 'releaseNames'
}

export function getTypeForLinkableField(field) {
  switch (field) {
    case 'artistNames':
      return EntityType.ARTIST
    case 'releaseNames':
      return EntityType.RELEASE
    default:
      return null
  }
}

export function getIdFieldForLinkableField(field) {
  switch (field) {
    case 'artistNames':
      return 'artistIds'
    case 'releaseNames':
      return 'releaseIds'
    default:
      return ''
  }
}
