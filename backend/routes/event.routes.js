const express = require("express");
const controller = require("../controllers/event.controller");
const router = express.Router();

router.get("/list", controller.list);
router.get("/user-event", controller.userEvent);
router.get("/admin-event-list", controller.adminEventList);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.patch("/delete/:id", controller.delete);
router.delete("/permanent-delete/:id", controller.permanentDelete);

module.exports = router;
