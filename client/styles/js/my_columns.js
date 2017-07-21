const fs = require('fs')
const path = require('path')

const NUM_COLUMNS = 24

let css = '.my-row {\n'
    + '  display: flex;\n'
    + '  align-items: center;\n'
    + '}\n\n'

const columnSelectors = []
for (let i = 0; i <= NUM_COLUMNS; i++) {
  columnSelectors.push('.my-col-' + i)
}

css += columnSelectors.join(',\n') + ' {padding: 0; margin: 0;}\n\n'

let width = 0
const columnWidth = 100 / NUM_COLUMNS
for (let i = 0; i <= NUM_COLUMNS; i++) {
  if (i === NUM_COLUMNS) width = 100
  css += columnSelectors[i] + ` { flex: 0 1 ${width}%; }\n`
  width += columnWidth
}

const writePath = path.resolve(__dirname, '../generated/my_columns.css')

fs.writeFile(writePath, css, function(err) {
  if (err) return console.log(err)
  console.log('Successfully generated css file');
})
