

const contactsService = require("../models/contacts");

const {HttpError} =require("../helpers");

const {ctrlWrapper} = require("../decorators");





  const getAllContatcs = async (_, res) => {
      const result = await contactsService.listContacts();
      res.json(result)
  };


  const getContactById = async (req, res) => {
      const {contactId} = req.params;
      const result = await contactsService.getContactById(contactId)
      if(!result){
        throw HttpError(404,`Contact with ${contactId} not found`)
      }
      res.json(result)
  };

  const addContact = async (req, res) => {
      const result = await contactsService.addContact(req.body)
      res.status(201).json(result)
  };

  const deleteContact = async (req, res) => {
      const {contactId} = req.params;
      const result = await contactsService.removeContact(contactId);
      if(!result){
        throw HttpError(404,`Contact with ${contactId} not found`)
      }
      res.json({message:"Contact deleted"})
    };

  const updateContact = async (req, res) => {
        const {contactId} = req.params;
    
        const result = await contactsService.updateContact(contactId,req.body);
        if(!result){
          throw HttpError(404,`Contact with ${contactId} not found`)
        }
        res.json(result)
    };


  module.exports = {
    getAllContatcs: ctrlWrapper(getAllContatcs),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
  }