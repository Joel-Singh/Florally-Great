import { Schema as SchemaMongoose, ObjectId } from "mongoose";
import CustomDocument from "./CustomDocument";

type getPropertyType<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : ObjectId;

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
  _id?: ObjectId;
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
