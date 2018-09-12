import { IAction } from './IAction';
import { generateId } from '../utils/generateId';
import {
  EDIT_ITEM,
  DELETE_ITEM,
} from './actionTypes';
import { createItemFactory } from './actionCreatorsFactory';

export const createItem = createItemFactory(generateId);

export const editItem = (id: Guid, text: string): IAction => ({
  type: EDIT_ITEM,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: Guid): IAction => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});
