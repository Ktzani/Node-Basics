const express = require("express")
const app = express();
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

const AdminAuth = require("../middlewares/AdminAuth");

router.get('/', HomeController.index);
router.post("/user", UserController.createUser)
router.get("/users", AdminAuth, UserController.allUsers)
router.get("/user/:codigo", AdminAuth, UserController.findUser)
router.put("/user", AdminAuth, UserController.editUser)
router.delete("/user/:codigo", AdminAuth, UserController.deleteUser)
router.post("/recoverpassword", UserController.recoverPassword)
router.put("/changepassword", UserController.changePassword)
router.post("/login", UserController.login)
router.post("/validate", AdminAuth, HomeController.validate)

module.exports = router;