import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { Invoice } from '../../models/invoice';
import { getUserId } from '../../lambda/utils';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('update-invoice');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const invoiceId = event.pathParameters.invoiceId;
  const updatedInvoice: Invoice = JSON.parse(event.body);
  // const userId = getUserId(event);
  const userId = '1234';

  await Db.getInstance().updateInvoice(updatedInvoice);

  logger.info(`Updated invoice ${updatedInvoice.invoiceId} with `, updatedInvoice);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  };
}