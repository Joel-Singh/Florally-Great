import { NextFunction, Request, Response } from "express";
import {
  ValidationChain,
  ValidationError,
  validationResult,
} from "express-validator";
import asyncHandler from "express-async-handler";

export default function getCreatePostMiddleware<
  DocumentProperties,
  Document extends { url: string },
>(
  validators: ValidationChain[],
  renderForm: (
    res: Response,
    locals: { errors: ValidationError[]; prepopulatedValues: object },
  ) => Promise<void>,
  getModelDataFromReqBody: (res: Request) => DocumentProperties,
  getPreviousDataFromReqBody: (res: Request) => object,
  saveDocument: (
    docProperties: DocumentProperties,
  ) => Promise<Document> | Promise<Error>,
) {
  return [
    validators,
    // @ts-ignore
    asyncHandler(async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await renderForm(res, {
          errors: errors.array(),
          prepopulatedValues: getPreviousDataFromReqBody(req),
        });
      } else {
        const document = await saveDocument(getModelDataFromReqBody(req));
        if ("url" in document) {
          res.redirect(document.url);
        } else {
          throw new Error(
            "Stinkers, did the document saved not have a url property or errored out?",
          );
        }
      }
    }),
  ];
}
