const express = require('express');

const {contactsController} = require("../../controllers");

const {contactSchemas} = require("../../models/contact");

const {validateBody, isValidId, authenticate} = require("../../decorators");


const router = express.Router();



router.get('/', authenticate, contactsController.getAllContatcs)

router.get('/:contactId', authenticate, isValidId,contactsController.getContactById)

router.post('/', authenticate, validateBody(contactSchemas.contactAddSchema),contactsController.addContact)

router.delete('/:contactId', authenticate, isValidId, contactsController.deleteContact)

router.put('/:contactId', authenticate, isValidId, validateBody(contactSchemas.contactAddSchema), contactsController.updateContact)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(contactSchemas.updateFavoriteSchema), contactsController.updateFavorite)

// router.

module.exports = router
