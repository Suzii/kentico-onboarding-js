import { Map } from 'immutable';

import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../types/IAction';
import { stopItemEditing } from './itemActions';
import { IServerItem } from '../../models/IServerItem';
import { Item } from '../../models/Item';

export const cancelItemsEditing = (selectedKeys: Array<Key>): IAction => ({
  type: actionTypes.ITEM_EDITING_STOP_ALL,
  payload: {
    actions: Map(selectedKeys.map(key => [key, stopItemEditing(key)])),
    selectedKeys,
  },
});

export const getItemsSuccess = (serverItems: Array<IServerItem>): IAction => ({
  type: actionTypes.ITEMS_GET_SUCCESS,
  payload: {
    items: serverItems.map((item: IServerItem) => new Item({
      key: item.id,
      value: item.text,
      temporaryValue: item.text,
    }))
  }
});

export const getItemsFailed = (error: string): IAction => ({
  type: actionTypes.ITEMS_GET_FAILED,
  payload: {
    error,
  }
});

export const addItemSuccess = (serverItem: IServerItem): IAction => ({
  type: actionTypes.ITEM_ADD_SUCCESS,
  payload: {
    item: new Item({
      key: serverItem.id,
      value: serverItem.text,
      temporaryValue: serverItem.text,
    })
  },
});

export const addItemFailed = (itemKey: Key, error: string): IAction => ({
  type: actionTypes.ITEM_ADD_FAILED,
  payload: {
    itemKey,
    error,
  },
});

export const saveItemSuccess = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_SAVE_SUCCESS,
  payload: {
    itemKey,
  },
});

export const saveItemFailed = (itemKey: Key, error: string): IAction => ({
  type: actionTypes.ITEM_SAVE_FAILED,
  payload: {
    itemKey,
    error,
  },
});

export const saveItemOptimistic = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_SAVE_OPTIMISTIC,
  payload: {
    itemKey,
  },
});

export const deleteItemSuccess = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_DELETE_SUCCESS,
  payload: {
    itemKey,
  },
});

export const deleteItemFailed = (itemKey: Key, error: string): IAction => ({
  type: actionTypes.ITEM_DELETE_FAILED,
  payload: {
    itemKey,
    error,
  },
});

export const deleteItemOptimistic = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_DELETE_OPTIMISTIC,
  payload: {
    itemKey,
  },
});

export const groupActionsToggle = (): IAction => ({
  type: actionTypes.ITEMS_GROUP_ACTIONS_TOGGLE,
});

export const itemsLoading = (): IAction => ({
  type: actionTypes.ITEMS_LOADING,
});

export const itemsLoadingDone = (): IAction => ({
  type: actionTypes.ITEMS_LOADING_DONE,
});

export const addItemOptimistic = (key: Key, itemValue: string): IAction => ({
  type: actionTypes.ITEM_ADD_OPTIMISTIC,
  payload: {
    item: new Item({
      key: key,
      value: itemValue,
      temporaryValue: itemValue,
      localOnly: true,
    })
  },
});

export const dismissError = (itemKey?: Key): IAction => ({
  type: actionTypes.ERROR_DISMISS,
  payload: {
    itemKey,
  }
});
