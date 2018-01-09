import { actionTypes } from '../constants/actionTypes';
import { IAction } from './IAction';
import { ItemId } from '../models/ItemId';

export const addItem = (id: ItemId, text: string): IAction => {
  return {
    type: actionTypes.ADD_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export function addItemFactory (idFunc: () => string, text: string) {
  const newItemId = idFunc();
  return addItem(newItemId, text);
}

export const deleteItem = (id: ItemId): IAction => {
  return {
    type: actionTypes.DELETE_ITEM,
    payload: { id },
  };
};

export const toggleEditing = (id: ItemId): IAction => {
  return {
    type: actionTypes.TOGGLE_EDITING,
    payload: { id },
  };
};

export const updateItemText = (id: ItemId): IAction => {
  return {
    type: actionTypes.UPDATE_ITEM,
    payload: { id },
  };
};

export const updateNewItemText = (newItemText: string): IAction => {
  return {
    type: actionTypes.UPDATE_NEW_ITEM,
    payload: { newItemText },
  };
};

export const textUpdateChange = (id: ItemId, updatedText: string): IAction => {
  return {
    type: actionTypes.EDIT_ITEM_TEXT,
    payload: {
      id,
      updatedText },
  };
};
