import { getSkills } from '../../../src/functions'
import { httpResponseCode, errorMsgMap, SkillsService } from '../../../src/libs'

describe('getSkills tests', () => {
  test('should return 200 with successful payload', async () => {
    SkillsService.prototype.getSkills = jest.fn().mockResolvedValue({
      data: 'Success payload!',
    })

    const results = await getSkills({})
    const expectedResults = {
      statusCode: httpResponseCode.SUCCESS,
      body: JSON.stringify({ data: 'Success payload!' }),
    }

    expect(results).toEqual(expectedResults)
  })

  Object.entries(errorMsgMap).map((value) => {
    test(`should return ${value[1]} when error message '${value[0]}' is thrown`, async () => {
      SkillsService.prototype.getSkills = jest
        .fn()
        .mockRejectedValue(new Error(value[0]))

      const results = await getSkills({})
      const expectedResults = { statusCode: value[1], body: value[0] }

      expect(results).toEqual(expectedResults)
    })
  })
})
