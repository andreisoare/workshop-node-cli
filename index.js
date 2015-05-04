#!/usr/bin/env node

var Command = require('./command')

function handleError(err) {
  if (err) {
    console.log('Error!')
  } else {
    console.log('OK!')
  }
}

switch(Command.getOperation()) {
  case 'add':
    return Command.add(handleError)

  case 'find':
    return Command.find(handleError)

  default:
    return console.log('Unknown command!')
}
