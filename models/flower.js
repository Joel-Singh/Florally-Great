const { Schema } = require("mongoose");

const flowerSchema = new Schema({
  name:          { type: String, required: true},
  description:   { type: String, required: true},
  price:         { type: Number, required: true},
  numberInStock: { type: Number, required: true},
  region:        { type: Schema.Types.ObjectId, ref: "Region", required: true}
});

flowerSchema.virtual('url').get(function() {
  return `/flowers/${this.name}`
})

module.exports = mongoose.model("Flower", flowerSchema);
