const express = require("express");
const controller = require("../controllers/admin.controller")
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const uploadFile = require("../middleware/uploadFile.middleware");
const router = express.Router();

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);
router.put("/update/:id",uploadFile("admin"), adminAuthMiddleware(controller.update));
router.patch("/delete/:id", adminAuthMiddleware(controller.delete));
router.delete("/permanent-delete/:id", adminAuthMiddleware(controller.permanentDelete));

module.exports = router;