import 'source-map-support/register';
import { 
  APIGatewayProxyEvent,
  APIGatewayProxyHandler, 
  APIGatewayProxyResult 
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../lambda/utils';
import { Db } from '../../dynamodb/db';

const logger = createLogger('create-user');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const user = {userId: getUserId(event)}
  await Db.getInstance().createUser(user);
  
  logger.info('new user created');

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(user)
  };
}