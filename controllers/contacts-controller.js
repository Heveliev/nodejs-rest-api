

const {Contact} = require("../models/contact");

const {HttpError} = require("../helpers");

const {ctrlWrapper} = require("../decorators");





  const getAllContatcs = async (_, res) => {
      const result = await Contact.find({},"-createdAt -updatedAt");
      res.json(result)
  };


  const getContactById = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findById(contactId);
      if(!result){
        throw HttpError(404,`Contact with ${contactId} not found`)
      }
      res.json(result)
  };

  

  const addContact = async (req, res) => {
      const result = await Contact.create(req.body);
      res.status(201).json(result)
  };

  const deleteContact = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if(!result){
        throw HttpError(404,`Contact with ${contactId} not found`)
      }
      res.json({message:"Contact deleted"})
    };

  const updateContact = async (req, res) => {
        const {contactId} = req.params;
    
        const result = await Contact.findByIdAndUpdate(contactId,req.body,{new:true});
        if(!result){
          throw HttpError(404,`Contact with ${contactId} not found`)
        }
        res.json(result)
    };

    const updateFavorite = async (req, res) => {
      const {contactId} = req.params;
  
      const result = await Contact.findByIdAndUpdate(contactId,req.body,{new:true});
      if(!result){
        throw HttpError(400,"missing field favorite")
      }
      res.json(result)
  };


  module.exports = {
    getAllContatcs: ctrlWrapper(getAllContatcs),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
  }