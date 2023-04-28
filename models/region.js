const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const regionSchema = new Schema({
  name: { type: String, required: true},
  description: { type: String, required: true}
});

regionSchema.virtual('url').get(function() {
  return `/region/${this.name}`
})

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Region", regionSchema);
