import { promisify } from 'util';
import { handler } from '../src/lambda/http/get-user';
import { event } from './eventHttpApiGateway';


const handlerPromise = promisify(handler);


describe('endpoint for getting users', () => {
  test('expect 200 response', () => {
    const result = handlerPromise(event, null, null);
    expect(result).toBeTruthy();
  });
});