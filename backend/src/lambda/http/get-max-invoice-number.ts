import { 
  APIGatewayProxyEvent,
  APIGatewayProxyResult, 
  APIGatewayProxyHandler 
} from 'aws-lambda';
import { getUserId } from '../../lambda/utils';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('get-invoices');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const userId = getUserId(event);
  // const userId = '1234';

  const maxInvoice = await Db.getInstance().getMaxInvoiceNumber(userId);

  logger.info('Retrieved max invoice number', userId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: maxInvoice ? JSON.stringify(maxInvoice.invoiceNumber) : JSON.stringify(1000)
  };
}