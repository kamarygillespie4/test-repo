const { Schema, model, Types } = require("mongoose");

const landHoldingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    legalEntity: {
      type: String,
      required: true,
    },
    netAcres: {
      type: String,
      required: true,
    },
    ownerRoyalty: {
      type: Number,
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
      match: [/^\d{3}$/],
    },
    township: {
      type: String,
      required: true,

      match: [/^\d{3}[NS]$/],
    },
    range: {
      type: String,
      required: true,

      match: [/^\d{3}[EW]$/],
    },
    titleSource: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ownerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    ownerType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    numberOfHoldings: {
      type: Number,
    },
    landHoldings: [landHoldingSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ownerSchema.virtual("landHoldingCount").get(function () {
  return this.landHoldings.length;
});

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
