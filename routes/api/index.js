const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ownerRoutes = require("./ownerRoutes");

router.use("/users", userRoutes);
router.use("/owners", ownerRoutes);

module.exports = router;
