import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
// import { getUserId } from '../../lambda/utils';
import { User } from '../../models/User';
import { Db } from '../../dynamodb/db';

const logger = createLogger('create-user');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const user: User = JSON.parse(event.body);
  user.userId = '1234'
  // user.userId = getUserId(event);

  await Db.getInstance().createUser(user);
  
  logger.info('new user created', user);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(user)
  };
}