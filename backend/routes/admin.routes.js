const express = require("express");
const controller = require("../controllers/admin.controller")

const router = express.Router();

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);
router.put("/update/:id", controller.update);
router.patch("/delete/:id", controller.delete);
router.delete("/permanent-delete/:id", controller.permanentDelete);

module.exports = router;