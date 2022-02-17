import {
  buildErrorResponse,
  buildResponse,
  errorMsgMap,
  httpResponseCode,
} from '../../../src/libs'

describe('response helper tests', () => {
  it('should return a built response with params', () => {
    const message = 'Success!'
    const results = buildResponse(httpResponseCode.CREATED, message)
    const expectedResults = {
      statusCode: httpResponseCode.CREATED,
      body: JSON.stringify(message),
    }

    expect(results).toEqual(expectedResults)
  })

  it('should return a built response with no params', () => {
    const message = 'No message provided'
    const results = buildResponse()
    const expectedResults = {
      statusCode: httpResponseCode.INVALID_REQUEST,
      body: JSON.stringify(message),
    }

    expect(results).toEqual(expectedResults)
  })

  Object.entries(errorMsgMap).map((value) => {
    test(`should return ${value[1]} when error message '${value[0]}' is thrown`, async () => {
      const results = buildErrorResponse(value[0])
      const expectedResults = { statusCode: value[1], body: value[0] }

      expect(results).toEqual(expectedResults)
    })
  })
})
