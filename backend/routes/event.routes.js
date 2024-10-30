const express = require("express");
const controller = require("../controllers/event.controller");
const router = express.Router();
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const uploadFile = require("../middleware/uploadFile.middleware");

router.get("/user-event", adminAuthMiddleware(controller.userEvent));
router.get("/admin-event-list", adminAuthMiddleware(controller.adminEventList));
router.post("/create",uploadFile("event"), adminAuthMiddleware(controller.create));
router.put("/update/:id",uploadFile("event"), adminAuthMiddleware(controller.update));
router.patch("/delete/:id", adminAuthMiddleware(controller.delete));
router.delete("/permanent-delete/:id", adminAuthMiddleware(controller.permanentDelete));

module.exports = router;
