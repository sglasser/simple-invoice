import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { getUserId } from '../../lambda/utils';
import { S3Client } from '../../s3/s3';
import { Db } from '../../dynamodb/db';
import { createLogger } from '../../utils/logger';

const logger = createLogger('generateUploadUrl');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // const userId = getUserId(event);

  const userId = '1234';

  const uploadUrl = await S3Client.getInstance().getUploadUrl(userId);
  logger.info('Generated Upload url', uploadUrl);
  const downloadUrl = `${process.env.USER_LOGO_DOWNLOAD_URL}${userId}`;
  await Db.getInstance().addUserLogoUrl(userId, downloadUrl);
  logger.info('Updated user with logo url', downloadUrl);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: uploadUrl
    })
  };
}