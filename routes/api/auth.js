const express = require("express");
const {validateBody, authenticate} = require("../../decorators");
const {userSchemas} = require("../../models");
const {authController} = require("../../controllers")



const router = express.Router();

router.post("/register",validateBody(userSchemas.registerSchema), authController.register);

router.post("/login",validateBody(userSchemas.loginSchema), authController.login);

router.get("/current", authenticate,  authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/", authenticate, validateBody(userSchemas.updateSubscriptionSchema), authController.updateSubscription)


module.exports = router