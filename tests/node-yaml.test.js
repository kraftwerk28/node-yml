const { readFileSync } = require('fs')
const { parse } = require('./yaml-parser')

// console.dir(parse(readFileSync('.eslintrc.yml', 'utf8')), { depth: null })

console.dir(parse(`
rules:
  - 123:
      456
    123:
      456
`), { depth: null })
