const errorMsgMap = {
  'Invalid request': 400,
  'Requested resource not found': 400,
  'Not found': 404,
}

export const buildResponse = (statusCode: number, body: any) => ({
  statusCode,
  body: JSON.stringify(body),
})

export const buildErrorResponse = (msg: string) => {
  const statusCode = errorMsgMap[msg]

  return {
    statusCode,
    body: msg,
  }
}
