const router = require("express").Router();
const {
  getOwners,
  getSingleOwner,
  createOwner,
  updateOwner,
  deleteOwner,
  createLandHolding,
  deleteLandHolding,
  getLandHoldings,
  updateLandHolding,
  getSingleLandHolding,
} = require("../../controllers/ownerControllers.js");

//just /owners
router.route("/").get(getOwners).post(createOwner);

router.get("/landHoldings", getLandHoldings);

//--- /owners/:ownerId
router
  .route("/:ownerId")
  .get(getSingleOwner)
  .put(updateOwner)
  .delete(deleteOwner)
  .get(getLandHoldings);

//////router.route("/landHoldings").get(getLandHoldings);

router
  .route("/:ownerId/landHoldings")
  .post(createLandHolding)
  .get(getLandHoldings);

router
  .route("/:ownerId/landHoldings/:landHoldingId")
  .delete(deleteLandHolding)
  .put(updateLandHolding)
  .get(getSingleLandHolding);

module.exports = router;
