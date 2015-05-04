var Contact = {}

Contact.parseName = function(str) {
  return str.split(',')[0].trim()
}

Contact.parseNumber = function(str) {
  return str.split(',')[1].trim()
}

Contact.createContact = function(str) {
  return {
    name: Contact.parseName(str),
    number: Contact.parseNumber(str)
  }
}

Contact.loadContacts = function(done) {
  var jsonfile = require('jsonfile')
    , util = require('./util')
    , jsonPath = util.getDataPath()

  jsonfile.readFile(jsonPath, done)
}


Contact.saveContacts = function(contacts, done) {
  var jf = require('jsonfile')
    , util = require('./util')
    , jsonPath = util.getDataPath()

  jf.writeFile(jsonPath, contacts, done)
}

Contact.saveContact = function(contact, done) {
  var _this = this

  this.loadContacts(function(err, contacts) {
    if (err) { return done(err) }
    contacts.push(contact)
    _this.saveContacts(contacts, done)
  })
}

Contact.findContacts = function(name, done) {
  Contact.loadContacts(function(err, Contacts) {
    if (err) {
      return done(err)
    }

    var result = Contacts.filter(function(contact) {
      return contact.name == name
    })

    done(null, result)
  })
}

module.exports = Contact
