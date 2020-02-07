import 'source-map-support/register';
import { 
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult 
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../lambda/utils';
import { Recipient } from '../../models/Recipient';
import { Db } from '../../dynamodb/db';

const logger = createLogger('create-recipient');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipient: Recipient = JSON.parse(event.body);

  recipient.userId = getUserId(event);

  await Db.getInstance().createRecipient(recipient);
  
  logger.info('new recipient created', recipient);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(recipient)
  };
}