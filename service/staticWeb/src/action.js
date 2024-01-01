/* /action.js */

export const getHandlerSplitPermissionList = ({ handleInvalidSession, handleSplitPermissionList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { splitPermissionList } = req.session.auth

    const handleResult = await handleSplitPermissionList({ splitPermissionList })

    createResponse({ req, res, handleResult })
  }
}


export const getHandlerMessageConvert = ({ handleMessageConvert, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { message } = req.body

    const handleResult = await handleMessageConvert({ accessToken, message })

    createResponse({ req, res, handleResult })
  }
}

