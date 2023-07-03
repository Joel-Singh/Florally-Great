module.exports = async function (controller, reqProperties, resProperties) {
  const { fakeReq, fakeRes } = getFakeMiddleware(reqProperties, resProperties);

  await controller(fakeReq, fakeRes);

  return {
    fakeReq,
    fakeRes,
    getRenderInformation: createMockInfoGetter(
      fakeRes.render,
      "view",
      "locals"
    ),
    getRedirectInformation: createMockInfoGetter(
      fakeRes.redirect,
      "redirectPage"
    ),
  };
};

function getFakeMiddleware(reqProperties, resProperties) {
  const fakeReq = {
    ...reqProperties,
  };

  const fakeRes = {
    render: jest.fn(),
    redirect: jest.fn(),
    ...resProperties,
  };

  return { fakeReq, fakeRes };
}

function createMockInfoGetter(mockFunction, ...namesInArgumentOrder) {
  return function () {
    const mockCalls = mockFunction.mock.calls;
    if (mockCalls.length === 0)
      throw new Error("Mock function hasn't been called!");

    const mockCall = mockCalls[0];
    const mockInfo = {};

    namesInArgumentOrder.forEach((name, index) => {
      mockInfo[name] = mockCall[index];
    });

    return mockInfo;
  };
}
