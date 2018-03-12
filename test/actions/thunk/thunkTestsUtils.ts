import Mock = jest.Mock;
import { IHttpClient } from '../../../src/models/interfaces/IHttpClient';

export const httpClientSuccessFactory = <T>(body: T | {} = {}): IHttpClient => {
  const resolver = () => Promise.resolve<any>(body);

  return ({
    get: resolver,
    delete: () => Promise.resolve(),
    post: resolver,
    patch: resolver,
    put: resolver,
  });
};

const rejector = () =>
  Promise.reject({});

export const httpClientFailure: IHttpClient = ({
  get: rejector,
  delete: rejector,
  post: rejector,
  patch: rejector,
  put: rejector,
});

export const fakeFunction = jest.fn();
export const dispatch = jest.fn();

export const resetDispatch = () =>
  dispatch.mockReset();

export const getFirstArgumentOfCalls = <T>(mockedFunction: Mock<T>): T[] =>
  mockedFunction
    .mock
    .calls
    .map(call => call[0]);