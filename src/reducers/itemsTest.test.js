import { OrderedMap } from 'immutable';
import { ADD_ITEM, } from '../constants/actionTypes';
import { ListItem } from '../models/ListItem';
import { items } from './items.js';
import { initialState } from '../models/initialState';
import {
  cancelEdit,
  deleteItem,
  updateItem,
  startEdit
} from '../actions';

describe('items reducer', () => {
  it('should have initial state', () => {
    expect(
      items(undefined, {})
    ).toEqual(initialState);
  });

  it('should return previous state on unknown action', () => {
    const itemId = '5';
    const expectedState = initialState;

    const actualState = items(initialState, {
      type: 'UNKNOWN_ACTION',
      payload: {
        text: 'Run the tests',
        id: itemId
      }
    });

    expect(expectedState).toEqual(actualState);
  });

  it('should handle ADD_ITEM', () => {
    const itemId = '5';
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Run the tests'
        })
      ]
    ]);

    const actualState = items(OrderedMap(), {
      type: ADD_ITEM,
      payload: {
        text: 'Run the tests',
        id: itemId
      }
    });

    expect(expectedState).toEqual(actualState);
  });

  it('should handle DELETE_ITEM', () => {
    const itemId = '5';
    const defaultItems = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
        })
      ]
    ]);
    const expectedState = OrderedMap();

    const actualState = items(defaultItems, deleteItem(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should handle START_EDIT', () => {
    const itemId = '5';
    const defaultItems = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
        })
      ]
    ]);
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
          isInEditMode: true
        })
      ]
    ]);

    const actualState = items(defaultItems, startEdit(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should handle CANCEL_EDIT', () => {
    const itemId = '5';
    const defaultItems = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
        })
      ]
    ]);
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
          isInEditMode: false
        })
      ]
    ]);

    const actualState = items(defaultItems, cancelEdit(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM', () => {
    const itemId = '5';
    const newText = 'Buy Beer';
    const defaultItems = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
        })
      ]
    ]);
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: newText,
        })
      ]
    ]);

    const actualState = items(defaultItems, updateItem(itemId, newText));

    expect(actualState).toEqual(expectedState);
  });
});
