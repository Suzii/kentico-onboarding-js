import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/actionCreators.ts';
import { errorReducer } from '../../../src/reducers/nodesListReducers/errorReducer.ts';
import {
  addFetchErrorFactory,
  addPostErrorFactory,
} from '../../../dist/src/actions/addErrorFactory';

describe('errorReducer', () => {
  const emptyState = OrderedMap();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const generateNewId = jest.fn(() => id);
  const text = 'error text';
  const nonEmptyState = emptyState.set(id, text);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = errorReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('DELETE_ERROR', () => {
    it('deletes an error statement correctly', () => {
      const action = actions.deleteError(id);

      const actualState = errorReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting non-existent node correctly', () => {
      const action = actions.deleteError(anotherId);

      const actualState = errorReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('POST_NODE_FAILURE', () => {
    it('handles adding a new error call', () => {
      const postNodeFailure = addPostErrorFactory(generateNewId);
      const action = postNodeFailure(text);

      const actualState = errorReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('FETCH_NODES_FAILURE', () => {
    it('handles adding a new error call', () => {
      const fetchNodesFailure = addFetchErrorFactory(generateNewId);
      const action = fetchNodesFailure(text);

      const actualState = errorReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});
