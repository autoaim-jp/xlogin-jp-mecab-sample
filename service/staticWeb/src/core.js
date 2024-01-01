/* /core.js */
/**
 * @name コア機能を集約したファイル
 * @memberof file
 */

/* local setting */
const mod = {}

const init = (setting, output, input, lib) => {
  mod.setting = setting
  mod.output = output
  mod.input = input
  mod.lib = lib
}

const handleSplitPermissionList = async ({ splitPermissionList }) => {
  const clientId = mod.setting.xdevkitSetting.getValue('env.CLIENT_ID')
  const result = { splitPermissionList, clientId }

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}


const handleMessageConvert = async ({ accessToken, message }) => {
  const textConvertResponse = await mod.output.textConvertRequest(argNamed({
    param: { accessToken, message },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))

  console.log({ textConvertResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  const { result } = textConvertResponse.data.result
  // const result = { parsedResult: 'a\nb\nc' }

  const handleResult = { response: { status, result } }
  return handleResult
}

const createResponse = ({ req, res, handleResult }) => {
  console.log('endResponse:', req.url, handleResult)
  // req.session.auth = handleResult.session

  const ERROR_PAGE = mod.setting.xdevkitSetting.getValue('url.ERROR_PAGE')
  const { redirect } = handleResult

  if (handleResult.response) {
    const json = handleResult.response
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  if (req.method === 'GET') {
    if (handleResult.redirect) {
      return mod.output.endResponse({ res, redirect: handleResult.redirect, ERROR_PAGE })
    }

    return mod.output.endResponse({ res, redirect: ERROR_PAGE, ERROR_PAGE })
  }

  if (redirect) {
    const json = { redirect }
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  const json = { redirect: ERROR_PAGE }
  return mod.output.endResponse({ res, json, ERROR_PAGE })
}

const handleInvalidSession = ({ req, res }) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    return res.json({ status })
  }

  return null
}

export default {
  init,

  handleSplitPermissionList,

  handleMessageConvert,

  createResponse,
  handleInvalidSession,
}

