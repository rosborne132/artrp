import { httpResponseCode } from './constants'

export const errorMsgMap = {
  'Invalid request': httpResponseCode.INVALID_REQUEST,
  'Requested resource not found': httpResponseCode.INVALID_REQUEST,
  'Not found': httpResponseCode.NOT_FOUND,
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
