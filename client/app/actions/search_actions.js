export const CHANGE_SEARCH_ENTITY_TYPE = 'CHANGE_SEARCH_ENTITY_TYPE'
export function changeSearchType(entityType) {
  return {type: CHANGE_SEARCH_ENTITY_TYPE, entityType}
}
