module.exports = async function(controller, reqProperties, resProperties) {
  const { fakeReq, fakeRes } = getFakeMiddleware(reqProperties, resProperties);

  await controller(fakeReq, fakeRes);

  return {
    renderCall: getRenderCall(fakeRes),
    renderLocals: getRenderLocals(fakeRes),
    renderView: getRenderView(fakeRes)
  }

  function getFakeMiddleware(options) {
    const fakeReq = {
      ...reqProperties
    };

    const fakeRes = {
      render: jest.fn(),
      ...resProperties
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
