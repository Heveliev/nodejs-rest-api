
const {Contact} = require("../../models");



const getAllContatcs = async (_, res) => {
    const result = await Contact.find({},"-createdAt -updatedAt");
    res.json(result)
};


module.exports = getAllContatcs