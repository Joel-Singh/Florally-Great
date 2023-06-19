module.exports = async function(controller, reqParams) {
  const { fakeReq, fakeRes } = getFakeMiddlewareParameters(reqParams);

  await controller(fakeReq, fakeRes);

  return {
    renderCall: getRenderCall(fakeRes),
    renderLocals: getRenderLocals(fakeRes),
    renderView: getRenderView(fakeRes)
  }

  function getFakeMiddlewareParameters(reqParams) {
    const fakeReq = {
      params: reqParams
    };

    const fakeRes = {
      render: jest.fn(),
    };

    return { fakeReq, fakeRes };
  }

  function getRenderCall(fakeRes) {
    return fakeRes.render.mock.calls[0];
  }

  function getRenderLocals(fakeRes) {
    return getRenderCall(fakeRes)[1];
  }

  function getRenderView(fakeRes) {
    return getRenderCall(fakeRes)[0];
  }
}
