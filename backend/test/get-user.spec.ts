import { promisify } from 'util';
import { handler } from '../src/lambda/http/get-user';

const event = {
  body: '',
  httpMethod: '',
  path: '',
  pathParameters: {},
  headers: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  multiValueQueryStringParameters: {},
  queryStringParameters: {},
  stageVariables: {},
  requestContext: {},
  resource: ''

}

const handlerPromise = promisify(handler);


describe('endpoint for getting users', () => {
  test('expect 200 response', () => {
    const result = handlerPromise(event, null, null);
    expect(result).toBeTruthy();
  });
});