import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { Recipient } from '../../models/Recipient';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('update-user');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // const userId = getUserId(event);
  const userId = '1234';
  const updatedRecipient: Recipient = JSON.parse(event.body);
  
  await Db.getInstance().updateRecipient(updatedRecipient);

  logger.info(`Updated recipientId: ${updatedRecipient.recipientId}`, updatedRecipient);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body:''
  };
}