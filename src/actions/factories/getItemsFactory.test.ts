import { getItemsFactory } from './getItemsFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('getItemsFactory works correctly', () => {
  const dispatchMock = jest.fn();

  it('dispatch success on getItems resolve with correct data', () => {
    const itemText = 'x text';
    const serverItem = { id: 'x', text: itemText };
    const getItemsMock = jest.fn(() => Promise.resolve([serverItem]));
    const factory = getItemsFactory(getItemsMock);

    const result = factory()(dispatchMock, { } as any, {});


    return result.then(() => {
      expect(getItemsMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEMS_GET_SUCCESS);
    });
  });

  it('dispatch error on getItems reject with correct error', () => {
    const getItemsMock = jest.fn(() => Promise.reject(''));
    const factory = getItemsFactory(getItemsMock);

    const result = factory()(dispatchMock, { } as any, {});

    return result.catch(() => {
      expect(getItemsMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEMS_GET_FAILED);
    });
  });
});
