const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const constacts = await listContacts();
  const res = constacts.find((contact) => contact.id === contactId);
  return res || null;
}

async function removeContact(contactId) {
  const constacts = await listContacts();
  const index = constacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [res] = constacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(constacts, null, 2));
  return res;
}

async function addContact(name, email, phone) {
  const constacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  constacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(constacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
