import { OrderedMap } from 'immutable';

import { getItemsFailed } from '../../actions/index';
import { ErrorComposition } from '../../models/ErrorComposition';
import { error as errorReducer } from './error';
import { ERROR_GET_ITEMS } from '../../constants/constants';
import { Key } from '../../@types/Key';
import { actionTypes } from '../../constants/actionTypes';

describe('error reducer works correctly', () => {
  it('ITEMS_GET_FAILED returns new state with global error', () => {
    const state = new ErrorComposition({ globalError: 'previous test error' });
    const expected = state.with({ globalError: ERROR_GET_ITEMS });

    const action = getItemsFailed('');
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns default state', () => {
    const action = { type: actionTypes.ITEM_ADD, payload: undefined };
    const actual = errorReducer(undefined, action);

    expect(actual).toEqual(new ErrorComposition());
  });

  it('undefined action returns previous state', () => {
    const emptyErrors = OrderedMap<Key, string>();
    const errors = emptyErrors.set('xy', 'error 1');
    const state = new ErrorComposition({
      globalError: 'previous test error',
      itemsError: errors,
    });

    const action = { type: actionTypes.ITEM_ADD, payload: undefined };
    const actual = errorReducer(state, action);

    expect(actual).toEqual(state);
  });
});
