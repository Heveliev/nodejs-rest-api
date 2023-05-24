const {ctrlWrapper} = require("../../decorators");



const getAllContatcs = require("./getAllContatcs");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");




module.exports = {
    getAllContatcs: ctrlWrapper(getAllContatcs),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
  }