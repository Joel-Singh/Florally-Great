const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://Joel:Joel@flower-store.byzszdj.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
