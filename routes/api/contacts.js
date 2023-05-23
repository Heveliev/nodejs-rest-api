const express = require('express');

const contactsController = require("../../controllers/contacts-controller")

const {schemas} = require("../../models/contact");

const {validateBody, isValidId} = require("../../decorators")

const router = express.Router();



router.get('/', contactsController.getAllContatcs)

router.get('/:contactId', isValidId,contactsController.getContactById)

router.post('/', validateBody(schemas.contactAddSchema),contactsController.addContact)

router.delete('/:contactId', isValidId, contactsController.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContact)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateFavorite)

module.exports = router
