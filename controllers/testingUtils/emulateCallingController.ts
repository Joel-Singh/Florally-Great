import { Request, Response } from "express";

type nestedFunctionArray = Array<Function | nestedFunctionArray>;
export default async function emulateCallingController(
  controller: nestedFunctionArray | Function,
  reqProperties: Partial<Request> = {},
  resProperties: Partial<Response> = {},
) {
  const { fakeReq, fakeRes } = getFakeMiddleware(reqProperties, resProperties);

  if (!Array.isArray(controller)) {
    await controller(fakeReq, fakeRes);
  } else {
    // @ts-ignore
    controller = controller.flat(Infinity) as Array<Function>;
    await runMiddlewareArray(controller as Array<Function>, fakeReq, fakeRes);
  }

  return {
    fakeReq,
    fakeRes,
    getRenderInformation: createMockInfoGetter(
      fakeRes.render,
      "view",
      "locals",
    ),
    getRedirectInformation: createMockInfoGetter(
      fakeRes.redirect,
      "redirectPage",
    ),
  };
}

function getFakeMiddleware(
  reqProperties: Partial<Request>,
  resProperties: Partial<Response>,
) {
  const fakeReq = {
    ...reqProperties,
  };

  const fakeRes = {
    ...resProperties,
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn(),
  };

  return { fakeReq, fakeRes };
}

function createMockInfoGetter<T extends Record<string, any>>(
  mockFunction: jest.Mock,
  ...namesInArgumentOrder: Array<keyof T>
) {
  return function () {
    const mockCalls = mockFunction.mock.calls;
    if (mockCalls.length === 0)
      throw new Error("Mock function hasn't been called!");

    const mockCall = mockCalls[0];
    const mockInfo: Partial<T> = {};

    namesInArgumentOrder.forEach((name, index) => {
      mockInfo[name] = mockCall[index];
    });

    return mockInfo as T;
  };
}

async function runMiddlewareArray(
  middlewares: Array<Function>,
  req: Partial<Request>,
  res: Partial<Response>,
) {
  for (const middleware of middlewares) {
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };
    await middleware(req, res, next);
    if (!nextCalled) break;
  }
}
