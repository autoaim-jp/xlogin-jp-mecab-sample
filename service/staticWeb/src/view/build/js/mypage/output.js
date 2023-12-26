/* create elm */

/* request */
export const getConvertMessage = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/message/convert`
  return () => {
    const messageContentElm = document.querySelector('#messageContent')
    const param = { message: messageContentElm.value }
    console.log({ debug: true, param })
    return postRequest(url, param)
  }
}

/* onClick */
export const setOnClickConvertMessageButton = ({ onClickConvertMessageButton }) => {
  const convertMessageBtn = document.querySelector('#convertMessageBtn')
  convertMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickConvertMessageButton()
  }
}


/* show data */

/* show elm */
export const showConvertResult = ({ convertResult }) => {
  document.querySelector('#convertResultTextArea').value = convertResult.result.parsedResult
}

export const showTextArea = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:text_lib_v1`]) {
    document.querySelector('#convertContainer').classList.remove('hidden')
  } else {
    document.querySelector('#textLibPermissionRequestContainer').classList.remove('hidden')
  }
}

