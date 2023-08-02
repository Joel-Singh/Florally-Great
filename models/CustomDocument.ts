import mongoose, { Document } from "mongoose";

type CustomDocument<Properties, VirtualProperties> = Document &
  Properties &
  VirtualProperties & { _id: mongoose.Types.ObjectId };

export default CustomDocument;
