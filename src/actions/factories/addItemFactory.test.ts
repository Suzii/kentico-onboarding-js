import { addItemFactory } from './addItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('addItemFactory works correctly', () => {
  const dispatchMock = jest.fn();

  it('dispatch success on postItem resolve with correct data', () => {
    const itemText = 'x text';
    const serverItem = { id: 'x', text: itemText };
    const postItemMock = jest.fn(() => Promise.resolve(serverItem));
    const factory = addItemFactory(postItemMock);

    const result = factory(itemText)(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(postItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_ADD_SUCCESS);
    });
  });

  it('dispatch error on postItem reject with correct error', () => {
    const postItemMock = jest.fn(() => Promise.reject(''));
    const factory = addItemFactory(postItemMock);

    const result = factory('')(dispatchMock, { } as any, {});

    return result.catch(() => {
      expect(postItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_ADD_FAILED);
    });
  });
});
