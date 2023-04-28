const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../../controllers/userControllers.js");

// /api/users
router.route("/").get(getUsers).post(createUser);
router.route("/login").post(login);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
