import { DbService, SkillsService } from '../../../src/libs'

const dbService = new DbService('testTable')
const skillsService = new SkillsService(dbService)

const invalidReqMsg = 'Invalid request'
const genericErrorMsg = 'Error'
const successMsg = 'OK'
const newSkillsObj = {
  level: 1,
  experiencePoints: 0,
}

let payload
let mockSkillsObj

describe('skillsService tests', () => {
  beforeEach(() => {
    payload = {
      pathParameters: {
        id: 'testId',
      },
    }

    mockSkillsObj = {
      skills: {
        'color-light': newSkillsObj,
        anatomy: newSkillsObj,
        composition: newSkillsObj,
        construction: newSkillsObj,
        design: newSkillsObj,
        gesture: newSkillsObj,
        perspective: newSkillsObj,
      },
    }
  })

  describe('createSkills tests', () => {
    it('should return a new skill object for user', async () => {
      const expectedResults = {
        id: 'testId',
        skills: {
          ...mockSkillsObj,
        },
      }

      DbService.prototype.createItem = jest
        .fn()
        .mockResolvedValue(expectedResults)

      const results = await skillsService.createSkills(payload)

      expect(results).toEqual(expectedResults)
    })

    it('should throw an error if a path param `id` is not provided', async () => {
      try {
        // @ts-ignore
        await skillsService.createSkills({})
      } catch (err) {
        expect(err.message).toBe(invalidReqMsg)
      }
    })

    it('should throw an error if the dbService fails', async () => {
      DbService.prototype.createItem = jest
        .fn()
        .mockRejectedValue(genericErrorMsg)

      try {
        await skillsService.createSkills(payload)
      } catch (err) {
        expect(err).toBe(genericErrorMsg)
      }
    })
  })

  describe('deleteSkills tests', () => {
    it(`should return '${successMsg}' when skill is deleted`, async () => {
      DbService.prototype.deleteItem = jest.fn().mockResolvedValue(successMsg)

      const results = await skillsService.deleteSkills(payload)

      expect(results).toEqual(successMsg)
    })

    it('should throw an error if a path param `id` is not provided', async () => {
      try {
        // @ts-ignore
        await skillsService.deleteSkills({})
      } catch (err) {
        expect(err.message).toBe(invalidReqMsg)
      }
    })

    it('should throw an error if the dbService fails', async () => {
      DbService.prototype.deleteItem = jest
        .fn()
        .mockRejectedValue(genericErrorMsg)

      try {
        await skillsService.deleteSkills(payload)
      } catch (err) {
        expect(err).toBe(genericErrorMsg)
      }
    })
  })

  describe('getSkills tests', () => {
    it('should return a skill object for user', async () => {
      const expectedResults = {
        id: 'testId',
        skills: {
          ...mockSkillsObj,
        },
      }

      DbService.prototype.getItem = jest.fn().mockResolvedValue(expectedResults)

      const results = await skillsService.getSkills(payload)

      expect(results).toEqual(expectedResults)
    })

    it('should throw an error if a path param `id` is not provided', async () => {
      try {
        // @ts-ignore
        await skillsService.getSkills({})
      } catch (err) {
        expect(err.message).toBe(invalidReqMsg)
      }
    })

    it('should throw an error if the dbService fails', async () => {
      DbService.prototype.getItem = jest.fn().mockRejectedValue(genericErrorMsg)

      try {
        await skillsService.getSkills(payload)
      } catch (err) {
        expect(err).toBe(genericErrorMsg)
      }
    })
  })

  describe('updateSkills tests', () => {
    it('should return an updated skill obj for tag `anatomy`', async () => {
      payload.body = JSON.stringify({ tags: ['anatomy'] })
      const getExpectedResults = {
        id: 'testId',
        skills: {
          ...mockSkillsObj.skills,
        },
      }
      const expectedUpdatedSkills = {
        id: 'testId',
        skills: {
          ...mockSkillsObj.skills,
          anatomy: {
            level: 1,
            experiencePoints: 5,
          },
        },
      }

      DbService.prototype.getItem = jest
        .fn()
        .mockResolvedValue(getExpectedResults)

      DbService.prototype.updateItem = jest
        .fn()
        .mockResolvedValue(expectedUpdatedSkills)

      const results = await skillsService.updateSkills(payload)

      expect(results).toEqual(expectedUpdatedSkills)
      expect(getExpectedResults.skills.anatomy.experiencePoints).toBeLessThan(
        expectedUpdatedSkills.skills.anatomy.experiencePoints,
      )
      expect(DbService.prototype.updateItem).toBeCalledWith('testId', {
        ...expectedUpdatedSkills.skills,
      })
    })

    it('should return an updated skill obj for tag `anatomy` with new level', async () => {
      payload.body = JSON.stringify({ tags: ['anatomy'] })
      const getExpectedResults = {
        id: 'testId',
        skills: {
          ...mockSkillsObj.skills,
          anatomy: {
            level: 1,
            experiencePoints: 165,
          },
        },
      }
      const expectedUpdatedSkills = {
        id: 'testId',
        skills: {
          ...mockSkillsObj.skills,
          anatomy: {
            level: 2,
            experiencePoints: 0,
          },
        },
      }

      DbService.prototype.getItem = jest
        .fn()
        .mockResolvedValue(getExpectedResults)

      DbService.prototype.updateItem = jest
        .fn()
        .mockResolvedValue(expectedUpdatedSkills)

      const results = await skillsService.updateSkills(payload)

      expect(results).toEqual(expectedUpdatedSkills)
      expect(getExpectedResults.skills.anatomy.level).toBeLessThan(
        expectedUpdatedSkills.skills.anatomy.level,
      )
      expect(DbService.prototype.updateItem).toBeCalledWith('testId', {
        ...expectedUpdatedSkills.skills,
      })
    })

    it('should throw an error if a path param `id` is not provided', async () => {
      try {
        // @ts-ignore
        await skillsService.updateSkills({})
      } catch (err) {
        expect(err.message).toBe(invalidReqMsg)
      }
    })

    it('should throw an error if a path param `tags` is not provided', async () => {
      try {
        await skillsService.updateSkills(payload)
      } catch (err) {
        expect(err.message).toBe(invalidReqMsg)
      }
    })

    it('should throw an error if the dbService fails at getItem', async () => {
      DbService.prototype.getItem = jest.fn().mockRejectedValue(genericErrorMsg)

      try {
        payload.body = JSON.stringify({ tags: ['testTag'] })
        await skillsService.updateSkills(payload)
      } catch (err) {
        expect(err).toBe(genericErrorMsg)
      }
    })

    it('should throw an error if the dbService fails at updateItem', async () => {
      DbService.prototype.getItem = jest.fn().mockResolvedValue(mockSkillsObj)

      DbService.prototype.updateItem = jest
        .fn()
        .mockRejectedValue(genericErrorMsg)

      try {
        payload.body = JSON.stringify({ tags: ['testTag'] })
        await skillsService.updateSkills(payload)
      } catch (err) {
        expect(err).toBe(genericErrorMsg)
      }
    })
  })
})
