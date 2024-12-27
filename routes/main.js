const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/add-user", UserController.postAddUser);
router.get("/get-users", UserController.getUserData);
router.post("/delete-user", UserController.postDeleteUser);
router.post("/update-user", UserController.postUpdateUser);

module.exports = router;
