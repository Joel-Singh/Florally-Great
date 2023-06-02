const request = require('supertest')

module.exports = async function(app, endpoint, data) {
  return await request(app)
    .post(endpoint)
    .send(createFormDataString(data))
    .set('Content-Type', 'application/x-www-form-urlencoded')
}

function createFormDataString(data) {
  let formString = '';

  Object.entries(data).forEach(([prop, value]) => {
    formString += `${prop}=${value}&`
  });

  formString = removeTrailingAmpersand(formString)
  return formString

  function removeTrailingAmpersand(string) {
    return string.slice(0, -1)
  }
}
