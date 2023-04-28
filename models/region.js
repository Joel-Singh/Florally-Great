const { Schema } = require("mongoose");

const regionSchema = new Schema({
  name: { type: String, required: true},
  description: { type: String, required: true}
});

regionSchema.virtual('url').get(function() {
  return `/region/${this.name}`
})

module.exports = mongoose.model("Region", regionSchema);
