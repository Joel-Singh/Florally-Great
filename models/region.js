const { Schema, model } = require("mongoose");

const regionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

regionSchema.virtual("url").get(function () {
  return `/regions/${this.name}`;
});

module.exports = model("Region", regionSchema);
