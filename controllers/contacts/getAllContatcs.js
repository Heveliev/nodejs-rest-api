
const {Contact} = require("../../models");



const getAllContatcs = async (req, res) => {
    const {_id:owner} = req.user;
    const {page = 1, limit = 20,favorite} = req.query;
    const skip = (page-1) * limit;
    let result = await Contact.find({owner},"-createdAt -updatedAt",{skip,limit}).populate("owner", "name email");
    if(favorite){
        result = result.filter(contact => contact.favorite.toString() === favorite);
    }
    res.json(result);
};


module.exports = getAllContatcs