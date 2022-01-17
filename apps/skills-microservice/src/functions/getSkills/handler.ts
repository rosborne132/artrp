import { buildErrorResponse, buildResponse } from "../../libs";
import { DbService, SkillsService } from "../../libs/services";

const tableName = process.env.SKILLS_TABLE ?? "skills_dev";
const dbService = new DbService(tableName);
const skillsService = new SkillsService(dbService);

export const getSkills = async (event) => {
  try {
    const data = await skillsService.getSkills(event);
    return buildResponse(200, data);
  } catch (err) {
    return buildErrorResponse(err.message);
  }
};
