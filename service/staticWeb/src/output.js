/* /output.js */

const textConvertRequest = ({
  accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest, message,
}) => {
  const path = `/api/${API_VERSION}/text-lib/parse`
  const param = {
    message,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

/* to http client */
const endResponse = ({
  res, json, redirect, ERROR_PAGE,
}) => {
  if (redirect) {
    return res.redirect(redirect)
  } if (json) {
    return res.json(json)
  }
  return res.redirect(ERROR_PAGE)
}

export default {
  textConvertRequest,

  endResponse,
}

