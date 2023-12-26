export const getOnClickConvertMessageButton = ({ convertMessage, showConvertResult }) => {
  return async () => {
    const convertResult = await convertMessage()
    showConvertResult({ convertResult })
  }
}

export default {}

