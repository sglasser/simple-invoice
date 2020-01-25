import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';

export class S3Client {

  private static instance: S3Client;
  private s3: AWS.S3;
  private logger = createLogger('S3Client');

  constructor() {
    const XAWS = AWSXRay.captureAWS(AWS);
    this.s3 = new XAWS.S3({
      signatureVersion: 'v4'
    });
  }

  static getInstance() {
    if (!S3Client.instance) {
      S3Client.instance = new S3Client();
    }
    return S3Client.instance;
  }

  getUploadUrl(userId: string): string {
    this.logger.info('creating s3 upload url');
    console.log('userId', userId);
    console.log('bucket', process.env.USER_LOGO_S3_BUCKET);
    return this.s3.getSignedUrl('putObject', {
      Bucket: `${process.env.USER_LOGO_S3_BUCKET}`,
      Key: userId,
      Expires: 300
    });
  }

}