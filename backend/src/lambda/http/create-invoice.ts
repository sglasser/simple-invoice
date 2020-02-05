import 'source-map-support/register';
import { 
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult 
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../lambda/utils';
import { Invoice } from '../../models/invoice';
import { Db } from '../../dynamodb/db';

const logger = createLogger('create-invoice');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const invoice: Invoice = JSON.parse(event.body);
  // invoice.userId = '1234'
  invoice.userId = getUserId(event);

  await Db.getInstance().createInvoice(invoice);
  
  logger.info('new invoice created', invoice);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(invoice)
  };
}
