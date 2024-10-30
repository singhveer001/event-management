const express = require("express");
const controller = require("../controllers/user.controller")
const router = express.Router();
const userAuthMiddleware = require("../middleware/userAuth.middleware");
const uploadFile = require("../middleware/uploadFile.middleware");

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);
router.get("/event-list", userAuthMiddleware(controller.eventList));
router.post("/book-event", userAuthMiddleware(controller.bookEvent));
router.put("/update/:id",uploadFile("user"), userAuthMiddleware(controller.update));
router.patch("/delete/:id", userAuthMiddleware(controller.delete));
router.delete("/permanent-delete/:id", userAuthMiddleware(controller.permanentDelete));

module.exports = router;