const {HttpError} = require("../../helpers");
const {Contact} = require("../../models");


const deleteContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if(!result){
      throw HttpError(404,`Contact with ${contactId} not found`)
    }
    res.json({message:"Contact deleted"})
  };

  module.exports = deleteContact;