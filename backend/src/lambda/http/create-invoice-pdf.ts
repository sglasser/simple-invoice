import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
// import { getUserId } from '../../lambda/utils';
import { Invoice } from '../../models/invoice';
import * as pug from 'pug';
import * as chromium from 'chrome-aws-lambda';
import * as fs from 'fs';
import * as path from 'path';

const logger = createLogger('create-invoice-pdf');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // https://github.com/ARautio/aws-lambda-pdf-generator-puppeteer/blob/master/src/template.pug
  // https://dev.to/akirautio/generate-a-pdf-in-aws-lambda-with-nodejs-and-puppeteer-2b93

  const invoice: Invoice = JSON.parse(event.body);
  invoice.userId = '1234'

  const template = pug.compileFile('./templates/invoice.pug')
  const html = template({ invoice })

  let browser = null
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    })

    const page = await browser.newPage()
    page.setContent(html)
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
    })

    logger.info('pdf created', invoice);

    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-type': 'application/pdf',
        'content-disposition': 'attachment; filename=test.pdf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: pdf.toString('base64')
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: err,
      })
    };
  }
}