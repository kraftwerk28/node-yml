'use strict'

const TABCHAR = '  '

const types = {
  'null': null,
  'true': true,
  'false': false,
}

const strre = /^["']?([^"']*)["']?$/

const tabError = () => {
  throw new Error('Tab length must be 2 spaces')
}

/**
 * @param {string} input 
 */
function tokenize(input) {
  const rows = input.split('\n').filter(v => v.length > 0)
  const tokens = []
  const re = new RegExp(
    `^((?:${TABCHAR})*)((?:- )?)(?: *)?(\\w+)(?: *)?(\:)?(?: *)(.+)?$`
  )
  rows.forEach((row) => {
    const match = row.match(re)
    const token = {}

    const tabs = match[1].length / TABCHAR.length
    if (tabs % 1 !== 0) {
      tabError()
    }
    
    // token.isListItem = match[2].length === 2
    token.tabs = tabs
    token.key = match[3]
    token.semicolon = (typeof match[4] !== 'undefined')
    if (match[2].length === 2) { // "- "
      tokens.push({
        tabs,
        isListItem: true
      })
      token.tabs++
    }
    tokens.push(token)
    if (token.semicolon && match[5]) {
      tokens.push({ 
        tabs: token.tabs + 1,
        isListItem: false,
        key: match[5],
        semicolon: false
      })
    }
  })

  return tokens
}

/**
 * Parses a string into javascript Object
 * @param {string} str 
 */
function parse(str) {
  const tokens = tokenize(str)
  // console.log(tokens)
  // process.exit(0)
  const get = () => tokens[0]
  const shift = () => tokens.shift()

  function parseValue() {
    // it shifts value that was parsed
    const start = get()
    if (start.isListItem) {
      return parseArr()
    }
    if (start.semicolon) {
      if (start.value) {
        return { [start.key]: start.value }
      } else {
        return parseObj()
      }
    }
    return parseScalar()
  }

  function parseObj() {
    const res = {}
    let current = get()
    const tabs = current.tabs
    while (current && current.tabs === tabs && !current.isListItem) {
      shift()
      res[current.key] = parseValue()
      current = get()
    }
    return res
  }

  function parseArr() {
    const res = []
    let current = get()
    const tabs = current.tabs
    while (current && current.tabs === tabs && current.isListItem) {
      shift()
      const elem = parseValue()
      res.push(elem)
      current = get()
    }
    return res
  }

  function parseScalar() {
    const val = shift().key
    const may = types[val]
    if (typeof may !== 'undefined') {
      return may
    } else {
      const num = +val
      if (!isNaN(num)) {
        return num
      }
    }
    return val.match(strre)[1]
  }

  return parseValue()
}

module.exports = { parse }
