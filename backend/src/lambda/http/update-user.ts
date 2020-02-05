import 'source-map-support/register';
import { 
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult } from 'aws-lambda';
import { User } from '../../models/User';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('update-user');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const updatedUser: User = JSON.parse(event.body);
  
  await Db.getInstance().updateUser(updatedUser);

  logger.info('Updated user', updatedUser);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body:''
  };
}