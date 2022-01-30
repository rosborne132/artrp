# Skills Microservice

The Skills Microservice is a basic serverless API that performs CRUD operations on a users skills. 

## Architecture

![Skills Service](./assets/skills-service.png)

## Installation / Deployment Instructions

Follow the instructions below to run the api locally.

- Run `npm i` to install the project dependencies
- Run `npm install -g serverless` to install the serverless framework
- Rename template.env to .env.local
- Run `sls dynamodb install` to install the local version of dynamodb
- Run `sls dynamodb start` to start up local dynamodb instance
- 

Follow the instructions below to deploy your project.

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

## Testing The Service

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman
