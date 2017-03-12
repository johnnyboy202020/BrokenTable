'use strict'

module.exports.endpoint = (event, context, callbak) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Endpoint`
    })
  }

  callback(null, response);
}
