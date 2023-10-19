import { Request, Response } from "express";

type nestedFunctionArray = Array<Function | nestedFunctionArray>;
export default async function emulateCallingController(
  controller: nestedFunctionArray | Function,
  reqProperties: Partial<Request> = {},
  resProperties: Partial<Response> = {},
) {
  const { fakeReq, fakeRes } = getFakeMiddleware(reqProperties, resProperties);
  const mockNext = jest.fn();

  if (!Array.isArray(controller)) {
    await controller(fakeReq, fakeRes, mockNext);
  } else {
    // @ts-ignore
    controller = controller.flat(Infinity) as Array<Function>;
    await runMiddlewareArray(
      controller as Array<Function>,
      fakeReq,
      fakeRes,
      mockNext,
    );
  }

  return {
    fakeReq,
    fakeRes,
    mockNext,
    getRenderInformation: createMockInfoGetter(
      fakeRes.render,
      "view",
      "locals",
    ),
    getRedirectInformation: createMockInfoGetter(
      fakeRes.redirect,
      "redirectPage",
    ),
    getMockNextInformation: createMockInfoGetter(mockNext, "errorOrEmpty"),
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
  next: ReturnType<typeof jest.fn>,
) {
  for (const middleware of middlewares) {
    let previousCallLength = next.mock.calls.length;
    await middleware(req, res, next);
    let currentCallLength = next.mock.calls.length;
    let nextWasCalled = currentCallLength > previousCallLength;
    if (!nextWasCalled) break;
  }
}
