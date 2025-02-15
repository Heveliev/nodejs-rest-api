const express = require("express");
const {validateBody} = require("../../decorators");
const {userSchemas} = require("../../models");
const {authController} = require("../../controllers");
const { authenticate, upload} = require("../../midlewares");



const router = express.Router();

router.post("/register",validateBody(userSchemas.registerSchema), authController.register);
router.get("/verify/:verificationCode", authController.verifyEmail);

router.post("/verify", validateBody(userSchemas.vetifySchema),authController.resendVerifyEmail);

router.post("/login",validateBody(userSchemas.loginSchema), authController.login);

router.get("/current", authenticate,  authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/", authenticate, validateBody(userSchemas.updateSubscriptionSchema), authController.updateSubscription)

router.patch("/avatars",authenticate, upload.single("avatar"),authController.changeAvatar)

module.exports = router