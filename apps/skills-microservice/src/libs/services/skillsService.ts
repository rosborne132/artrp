import { Skill, Skills } from '../types'
import { experiencePointsByLevel } from '../utils'

export class SkillsService {
  constructor(private readonly dbService) {}

  /**
   * Creates a new skill object
   */
  private createStarterSkills(): Skill {
    return {
      level: 1,
      experiencePoints: 0,
    }
  }

  /**
   * Creates an updated skills object for a given user
   *
   * @param skills - user's previous skills
   * @param tags - art tags
   * @returns User skills
   *
   */
  private updateUserSkills(skills, tags): Skills {
    const updatedUserSkills = { ...skills }

    tags.forEach((tag) => {
      if (updatedUserSkills[tag] === undefined) return

      let experiencePoints = updatedUserSkills[tag].experiencePoints
      let level = updatedUserSkills[tag].level
      const experiencePointsToNextLevel = experiencePointsByLevel[level]

      experiencePoints += 5

      if (experiencePoints >= experiencePointsToNextLevel) {
        experiencePoints -= experiencePointsToNextLevel
        level += 1
      }

      updatedUserSkills[tag] = { experiencePoints, level }
    })

    return updatedUserSkills
  }

  /**
   * Creates a new skills object for a given user
   *
   * @param event - httpApi event
   * @returns User skills
   *
   */
  async createSkills({ pathParameters }): Promise<Skills> {
    if (!pathParameters?.id) throw new Error('Invalid request')

    try {
      const payload = {
        skills: {
          'color-light': this.createStarterSkills(),
          anatomy: this.createStarterSkills(),
          composition: this.createStarterSkills(),
          construction: this.createStarterSkills(),
          design: this.createStarterSkills(),
          gesture: this.createStarterSkills(),
          perspective: this.createStarterSkills(),
        },
      }
      return this.dbService.createItem(pathParameters.id, payload)
    } catch (err) {
      throw err
    }
  }

  /**
   * Returns 'OK' when the users skills have been removed from the DB.
   *
   * @param event - httpApi event
   * @returns String
   *
   */
  async deleteSkills({ pathParameters }): Promise<String> {
    if (!pathParameters?.id) throw new Error('Invalid request')

    try {
      await this.dbService.deleteItem(pathParameters.id)
      return 'OK'
    } catch (err) {
      throw err
    }
  }

  /**
   * Returns the skills for a given user.
   *
   * @param event - httpApi event
   * @returns User skills
   *
   */
  async getSkills({ pathParameters }): Promise<Skills> {
    if (!pathParameters?.id) throw new Error('Invalid request')

    try {
      return this.dbService.getItem(pathParameters.id)
    } catch (err) {
      throw err
    }
  }

  /**
   * Update the skills object for a given user
   *
   * @param event - httpApi event
   * @returns User skills
   *
   */
  async updateSkills({ body, pathParameters }): Promise<Skills> {
    const parsedBody = JSON.parse(body ?? JSON.stringify({}))

    if (!pathParameters?.id || !parsedBody?.tags)
      throw new Error('Invalid request')

    try {
      const { skills } = await this.dbService.getItem(pathParameters.id)
      const payload = this.updateUserSkills(skills, parsedBody.tags)

      return this.dbService.updateItem(pathParameters.id, payload)
    } catch (err) {
      throw err
    }
  }
}
