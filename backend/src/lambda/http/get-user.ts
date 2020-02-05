import 'source-map-support/register';
import { 
  APIGatewayProxyEvent, 
  APIGatewayProxyResult,
  APIGatewayProxyHandler 
} from 'aws-lambda';
import { getUserId } from '../../lambda/utils';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('get-users');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  // const userId = '1234';

  const user = await Db.getInstance().getUser(userId);

  logger.info('Retreived user:', user);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(user)
  };
}