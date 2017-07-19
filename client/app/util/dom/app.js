export function adjustScrollContainerHeightToFit() {
  var availableHeight = window.innerHeight
      - $('#search-bar').outerHeight()
      - $('#player-bar').outerHeight()
  $('#scroll-container').height(availableHeight)
}
