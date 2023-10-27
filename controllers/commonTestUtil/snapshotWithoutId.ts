import { Document } from "mongoose";

export function snapshotWithoutId(document: Document, snapshotName: string) {
  document = document.toObject();
  delete document._id;
  expect(document).toMatchSnapshot(snapshotName);
}
