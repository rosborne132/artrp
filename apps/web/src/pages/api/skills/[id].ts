const axios = require('axios')
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

import { DbService, SkillsService } from '../../../libs/services'
import {
  buildErrorResponse,
  buildResponse,
  httpResponseCode,
} from '../../../libs'

const tableName = process.env.SKILLS_TABLE ?? 'SkillsTable'
const dbService = new DbService(tableName)
const skillsService = new SkillsService(dbService)

const handleGetSkills = async (req) => {
  try {
    const event = {
      pathParameters: {
        id: req.query.id,
      },
    }
    const data = await skillsService.getSkills(event)
    return buildResponse(httpResponseCode.SUCCESS, data)
  } catch (err) {
    return buildErrorResponse(err.message)
  }
}

const handleCreateSkills = async (req) => {
  try {
    const event = {
      pathParameters: {
        id: req.query.id,
      },
    }
    const data = await skillsService.createSkills(event)
    return buildResponse(httpResponseCode.CREATED, data)
  } catch (err) {
    return buildErrorResponse(err.message)
  }
}

const handleDeleteSkills = async (req) => {
  try {
    const event = {
      pathParameters: {
        id: req.query.id,
      },
    }
    const data = await skillsService.deleteSkills(event)
    return buildResponse(httpResponseCode.CREATED, data)
  } catch (err) {
    return buildErrorResponse(err.message)
  }
}

const handleUpdateSkills = async (req) => {
  try {
    const event = {
      pathParameters: {
        id: req.query.id,
      },
      body: req.body,
    }
    const data = await skillsService.updateSkills(event)
    return buildResponse(httpResponseCode.CREATED, data)
  } catch (err) {
    return buildErrorResponse(err.message)
  }
}

const handleRequestByMethod = (req) => {
  switch (req.method) {
    case 'DELETE':
      return handleUpdateSkills(req)
    case 'GET':
      return handleGetSkills(req)
    case 'PATCH':
      return handleUpdateSkills(req)
    case 'POST':
      return handleCreateSkills(req)
    default:
      return buildErrorResponse('Method not supported')
  }
}

export default withApiAuthRequired(async function (req, res) {
  const response = await handleRequestByMethod(req)
  res.status(response.statusCode).json(JSON.parse(response.body))
})
