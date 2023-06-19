module.exports = async function(controller, options) {
  const { fakeReq, fakeRes } = getFakeMiddleware(options);

  await controller(fakeReq, fakeRes);

  return {
    renderCall: getRenderCall(fakeRes),
    renderLocals: getRenderLocals(fakeRes),
    renderView: getRenderView(fakeRes)
  }

  function getFakeMiddleware(options) {
    const { reqParams, reqBody } = options

    const fakeReq = {
      params: reqParams,
      body: reqBody
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
