const express = require("express");
const controller = require("../controllers/event.controller");
const router = express.Router();
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const userAuthMiddleware = require("../middleware/userAuth.middleware")
const uploadFile = require("../middleware/uploadFile.middleware");

router.get("/event-participants", adminAuthMiddleware(controller.eventParticipants));
router.get("/admin-event-list", adminAuthMiddleware(controller.adminEventList));
router.get("/user-booked-events", userAuthMiddleware(controller.userEventList));
router.post("/create",uploadFile("event"), adminAuthMiddleware(controller.create));
router.put("/update/:id",uploadFile("event"), adminAuthMiddleware(controller.update));
router.patch("/delete/:id", adminAuthMiddleware(controller.delete));
router.delete("/permanent-delete/:id", adminAuthMiddleware(controller.permanentDelete));

module.exports = router;
