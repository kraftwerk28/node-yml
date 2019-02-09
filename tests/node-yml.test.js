const { readFileSync } = require('fs')
const { deepEqual } = require('assert')
const { parse } = require('../lib/node-yml')

// console.dir(parse(readFileSync('.eslintrc.yml', 'utf8')), { depth: null })

const deepEquals = (obj1, obj2) => {

}

const ex1 = `
rules:
  - lol:
      456
    kek:
      456
`

const ex2 = readFileSync(__dirname + '/.eslintrc.yml', 'utf8')

const ex3 = `
key: 123
key_: 456
`

console.dir(parse(ex3), { depth: null })
