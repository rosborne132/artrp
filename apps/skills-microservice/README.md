# Skills Microservice

## Installation/deployment instructions

Follow the instructions below to deploy your project.

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS
- Run `sls dynamodb install` to install the local version of dynamodb
- Run `sls dynamodb start` to start up local dynamodb instance

## Test your service

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman
