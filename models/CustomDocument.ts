import mongoose, { Document } from "mongoose";

type CustomDocument<Properties, VirtualProperties> =
  Document<mongoose.Types.ObjectId> &
    Properties &
    VirtualProperties & { _id: mongoose.Types.ObjectId };

export default CustomDocument;
