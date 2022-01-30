import { Skill, Skills } from "../types";

export class SkillsService {
  constructor(private readonly dbService) {}

  private createStarterSkills(): Skill {
    return {
      level: 1,
      experiencePoints: 0,
    };
  }

  /**
   * Creates a new skills object for a given user
   *
   * @param event - httpApi event
   * @returns User skills
   *
   */
  async createSkills({ pathParameters }): Promise<Skills> {
    if (!pathParameters.id) throw new Error("Invalid request");

    try {
      const payload = {
        skills: {
          "color-light": this.createStarterSkills(),
          anatomy: this.createStarterSkills(),
          composition: this.createStarterSkills(),
          construction: this.createStarterSkills(),
          design: this.createStarterSkills(),
          gesture: this.createStarterSkills(),
          perspective: this.createStarterSkills(),
        },
      };
      return this.dbService.createItem(pathParameters.id, payload);
    } catch (err) {
      throw err;
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
    if (!pathParameters.id) throw new Error("Invalid request");

    try {
      return this.dbService.getItem(pathParameters.id);
    } catch (err) {
      throw err;
    }
  }
}
