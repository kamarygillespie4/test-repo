const { ObjectId } = require("mongoose").Types;

const { Owner } = require("../models");

module.exports = {
  getOwners(req, res) {
    Owner.find()
      .then((owners) => res.json(owners))
      .catch((err) => res.status(500).json(err));
  },

  getSingleOwner(req, res) {
    Owner.findOne({ _id: req.params.ownerId })
      .select("-__v")
      .then((owner) =>
        !owner
          ? res.status(404).json({ message: "No owner with that ID" })
          : res.json(owner)
      )
      .catch((err) => res.status(500).json(err));
  },
  createOwner(req, res) {
    Owner.findOne({ name: req.body.name, address: req.body.address })
      .then((existingOwner) => {
        if (existingOwner) {
          return res.status(409).json({
            message: "An owner with the same name and address already exists",
            owner: existingOwner,
          });
        } else {
          Owner.create(req.body)
            .then((owner) => res.json(owner))
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateOwner(req, res) {
    Owner.findOneAndUpdate(
      { _id: req.params.ownerId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((owner) =>
        !owner
          ? res.status(404).json({ message: "No owner with this id!" })
          : res.json(owner)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteOwner(req, res) {
    Owner.findOneAndDelete({ _id: req.params.ownerId })
      .then((owner) => {
        if (!owner) {
          res.status(404).json({ message: "No thought with this id!" });
        }
      })

      .then(() => res.json({ message: "owner deleted!" }))

      .catch((err) => res.status(500).json(err));
  },

  createLandHolding(req, res) {
    const ownerId = req.params.ownerId;
    Owner.findOne({ _id: ownerId })
      .then((owner) => {
        if (!owner) {
          return res.status(404).json({ message: "No owner with that ID" });
        }

        const newLandHolding = req.body;

        owner.landHoldings.push(newLandHolding);

        return owner
          .save()
          .then(() => res.json(newLandHolding))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteLandHolding(req, res) {
    const { ownerId, landHoldingId } = req.params;
    Owner.findOneAndUpdate(
      { _id: ownerId, "landHoldings._id": landHoldingId },
      { $pull: { landHoldings: { _id: req.params.landHoldingId } } },
      { new: true }
    )
      .then((owner) => {
        if (!owner) {
          return res
            .status(404)
            .json({ message: "No landholding found with that ID :(" });
        }
        return res.json(owner);
      })
      .catch((err) => res.status(500).json(err));
  },
  getLandHoldings(req, res) {
    Owner.find({})
      .populate("landHoldings")
      .exec((err, owners) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        const landHoldings = owners.reduce((acc, owner) => {
          return acc.concat(owner.landHoldings);
        }, []);
        if (landHoldings.length === 0) {
          return res.status(404).json({ message: "No land holdings found :(" });
        }
        return res.json(landHoldings);
      });
  },

  updateLandHolding(req, res) {
    const { ownerId, landHoldingId } = req.params;
    const {
      name,
      owner,
      legalEntity,
      netAcres,
      ownerRoyalty,
      sectionName,
      section,
      township,
      range,
      titleSource,
    } = req.body;

    Owner.findOneAndUpdate(
      { _id: ownerId, "landHoldings._id": landHoldingId },
      {
        $set: {
          "landHoldings.$.name": name,
          "landHoldings.$.owner": owner,
          "landHoldings.$.legalEntity": legalEntity,
          "landHoldings.$.netAcres": netAcres,
          "landHoldings.$.ownerRoyalty": ownerRoyalty,
          "landHoldings.$.sectionName": sectionName,
          "landHoldings.$.section": section,
          "landHoldings.$.township": township,
          "landHoldings.$.range": range,
          "landHoldings.$.titleSource": titleSource,
        },
      },
      { new: true }
    )
      .then((owner) => {
        if (!owner) {
          return res
            .status(404)
            .json({ message: "No owner found with that ID :(" });
        }
        res.json(owner);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleLandHolding(req, res) {
    const ownerId = req.params.ownerId;
    const landHoldingId = req.params.landHoldingId;

    Owner.findById(ownerId, (err, owner) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!owner) {
        return res.status(404).json({ message: "Owner not found" });
      }

      const landHolding = owner.landHoldings.find(
        (landHolding) => landHolding._id.toString() === landHoldingId
      );

      if (!landHolding) {
        return res.status(404).json({ message: "Land holding not found" });
      }

      res.json(landHolding);
    });
  },
};
