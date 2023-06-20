module.exports = async function (controller, reqProperties, resProperties) {
  const { fakeReq, fakeRes } = getFakeMiddleware(reqProperties, resProperties);

  await controller(fakeReq, fakeRes);

  return {
    fakeReq,
    fakeRes,
    getRenderInformation,
  };

  function getFakeMiddleware(options) {
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
};

function getRenderInformation(fakeRes) {
  const renderCalls = fakeRes.render.mock.calls;
  if (renderCalls.length === 0) throw new Error("Render hasn't been called!");

  const renderCall = renderCalls[0];
  return {
    view: renderCall[0],
    locals: renderCall[1],
  };
}
