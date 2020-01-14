import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { User } from '../../models/User';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('update-user');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // const userId = getUserId(event);
  const userId = '1234';
  const updatedUser: User = JSON.parse(event.body);
  
  await Db.getInstance().updateUser(updatedUser);

  logger.info(`Updated userId: ${userId}`, updatedUser);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body:''
  };
}