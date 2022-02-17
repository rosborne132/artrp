import { createSkills } from '../../../src/functions'
import { errorMsgMap, httpResponseCode, SkillsService } from '../../../src/libs'

describe('createSkills tests', () => {
  test('should return 200 with successful payload', async () => {
    SkillsService.prototype.createSkills = jest.fn().mockResolvedValue({
      data: 'Success payload!',
    })

    const results = await createSkills({})
    const expectedResults = {
      statusCode: httpResponseCode.CREATED,
      body: JSON.stringify({ data: 'Success payload!' }),
    }

    expect(results).toEqual(expectedResults)
  })

  Object.entries(errorMsgMap).map((value) => {
    test(`should return ${value[1]} when error message '${value[0]}' is thrown`, async () => {
      SkillsService.prototype.createSkills = jest
        .fn()
        .mockRejectedValue(new Error(value[0]))

      const results = await createSkills({})
      const expectedResults = { statusCode: value[1], body: value[0] }

      expect(results).toEqual(expectedResults)
    })
  })
})
