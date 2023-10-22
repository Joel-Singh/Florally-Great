import mongoose, {
  Schema as SchemaMongoose,
  ObjectId as SchemaObjectIdType,
} from "mongoose";
import CustomDocument from "./CustomDocument";

type RegularObjectId = mongoose.Types.ObjectId;

type getPropertyType<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : RegularObjectId;

type SchemaStructure = Record<
  string,
  {
    type:
      | StringConstructor
      | NumberConstructor
      | typeof SchemaMongoose.Types.ObjectId;
  }
>;

export type Properties<Schema extends SchemaStructure> = {
  [property in keyof Schema]: getPropertyType<Schema[property]["type"]>;
} & {
  _id?: RegularObjectId;
};

export type Document<
  Schema extends SchemaStructure,
  virtualProperties,
> = CustomDocument<Properties<Schema>, virtualProperties>;

export function setURLVirtual(schema: SchemaMongoose, folder: string) {
  schema.virtual("url").get(function (this: { name: string }) {
    return `/${folder}/${this.name}`;
  });
}
