import { promisify } from 'util';
import { handler } from '../src/lambda/http/get-user';
import eventStub from './eventHttpApiGateway.json';

const handlerPromise = promisify(handler);
const event = eventStub;
const context = {};


describe('endpoint for getting users', () => {
  test('expect 200 response', () => {
    const result = handlerPromise(event, context);
    expect(result).toBeTruthy();
  });
});