import { httpResponseCode } from './constants'

export const errorMsgMap = {
  'Invalid request': httpResponseCode.INVALID_REQUEST,
  'Requested resource not found': httpResponseCode.INVALID_REQUEST,
  'Not found': httpResponseCode.NOT_FOUND,
}

/**
 * Returns an error response payload by the given message
 *
 * @param msg - Error message
 * @returns An error response payload
 *
 */
export const buildErrorResponse = (msg: string) => {
  const statusCode = errorMsgMap[msg]

  return {
    statusCode,
    body: msg,
  }
}

/**
 * Returns a response payload
 *
 * @param statusCode - response status code
 * @param body - response body
 * @returns A response payload
 *
 */
export const buildResponse = (
  statusCode: number = httpResponseCode.INVALID_REQUEST,
  body: any = 'No message provided',
) => ({
  statusCode,
  body: JSON.stringify(body),
})
