export function resizeAppContent() {
  var contentHeight = window.innerHeight - $('#search-bar').outerHeight() - $('#player-bar').outerHeight()
  $('#content').height(contentHeight)
}
