const express = require("express");
const controller = require("../controllers/event.controller");
const router = express.Router();
const adminAuthMiddleware = require("../middleware/adminAuth.middleware")

router.get("/user-event", adminAuthMiddleware(controller.userEvent));
router.get("/admin-event-list", adminAuthMiddleware(controller.adminEventList));
router.post("/create", adminAuthMiddleware(controller.create));
router.put("/update/:id", adminAuthMiddleware(controller.update));
router.patch("/delete/:id", adminAuthMiddleware(controller.delete));
router.delete("/permanent-delete/:id", adminAuthMiddleware(controller.permanentDelete));

module.exports = router;
