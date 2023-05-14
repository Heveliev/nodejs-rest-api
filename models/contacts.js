const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname,"contacts.json");
const updateContactsList = async(contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))


async function listContacts () {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data)
  }
  
  async function getContactById(contactId) {
      const contacts = await listContacts();
      const result = contacts.find(item => item.id === contactId)
      return result || null
  }
  
async  function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
      return null
    }
    const [result] = contacts.splice(idx, 1);
    await updateContactsList(contacts)
    return result; 
  }
  
async function addContact(body) {
    const contacts = await listContacts(); 
    const newContact = {
      id: nanoid(),
      ...body,
    }
    contacts.push(newContact);
    await updateContactsList(contacts);
    return newContact
  }

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item=>item.id === contactId);
  if(idx === -1){
    return null
  }
  contacts[idx] = {id:contactId, ...body};
  await updateContactsList(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
