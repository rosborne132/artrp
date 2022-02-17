import * as AWSMock from 'aws-sdk-mock'
import * as AWS from 'aws-sdk'
import { DbService } from '../../../src/libs'

let dbService
const errorMsg = 'Requested resource not found'

describe('dbService tests', () => {
  describe('createItem tests', () => {
    test('should return a create dynamo object', async () => {
      AWSMock.setSDKInstance(AWS)
      AWSMock.mock(
        'DynamoDB.DocumentClient',
        'put',
        (params, callback: any) => {
          console.log('params: ', params)
          callback(null, { pk: 'foo', sk: 'bar' })
        },
      )
      dbService = new DbService('testTable')

      const results = await dbService.createItem('testKey', {})
      const expectedResults = { id: 'testKey' }

      expect(results).toEqual(expectedResults)
    })

    test('should throw an error when one occurs', async () => {
      dbService = new DbService('testTable')

      try {
        await dbService.createItem('testKey', {})
      } catch (err) {
        expect(err.message).toBe(errorMsg)
      }
    })
  })

  describe('deleteItem tests', () => {
    test('should return void', async () => {
      AWSMock.setSDKInstance(AWS)
      AWSMock.mock(
        'DynamoDB.DocumentClient',
        'delete',
        (params, callback: any) => {
          console.log('params: ', params)
          callback(null, {})
        },
      )
      dbService = new DbService('testTable')

      try {
        await dbService.deleteItem('testKey')
      } catch (err) {
        expect(err).toBeFalsy()
      }
    })

    test('should throw an error when one occurs', async () => {
      dbService = new DbService('testTable')

      try {
        await dbService.deleteItem('testKey')
      } catch (err) {
        expect(err.message).toBe(errorMsg)
      }
    })
  })

  describe('getItem tests', () => {
    test('should return a dynamo object', async () => {
      const Item = { id: 'testKey' }
      AWSMock.setSDKInstance(AWS)
      AWSMock.mock(
        'DynamoDB.DocumentClient',
        'get',
        (params, callback: any) => {
          console.log('params: ', params)
          callback(null, { Item })
        },
      )
      dbService = new DbService('testTable')

      const results = await dbService.getItem('testKey')
      const expectedResults = { ...Item }

      expect(results).toEqual(expectedResults)
    })

    test('should throw "Not found" if there are no results', async () => {
      AWSMock.setSDKInstance(AWS)
      AWSMock.mock(
        'DynamoDB.DocumentClient',
        'get',
        (params, callback: any) => {
          console.log('params: ', params)
          callback(null, {})
        },
      )
      dbService = new DbService('testTable')

      try {
        await dbService.getItem('testKey')
      } catch (err) {
        expect(err.message).toBe('Not found')
      }
    })

    test('should throw an error when one occurs', async () => {
      dbService = new DbService('testTable')

      try {
        await dbService.getItem('testKey')
      } catch (err) {
        expect(err.message).toBe(errorMsg)
      }
    })
  })

  describe('updateItem tests', () => {
    test('should return an updated dynamo object', async () => {
      const updatedAttributes = { id: 'testKey' }

      AWSMock.setSDKInstance(AWS)
      AWSMock.mock(
        'DynamoDB.DocumentClient',
        'update',
        (params, callback: any) => {
          console.log('params: ', params)
          callback(null, { Attributes: { ...updatedAttributes } })
        },
      )

      dbService = new DbService('testTable')

      const results = await dbService.updateItem('testKey', {})
      const expectedResults = { ...updatedAttributes }

      expect(results).toEqual(expectedResults)
    })

    test('should throw an error when one occurs', async () => {
      dbService = new DbService('testTable')

      try {
        await dbService.updateItem('testKey', {})
      } catch (err) {
        expect(err.message).toBe(errorMsg)
      }
    })
  })
})
