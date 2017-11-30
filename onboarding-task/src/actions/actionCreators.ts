import { IAction, ThunkAction } from '../interfaces/IAction';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,

  FETCH_STARTED,
  FETCH_SUCCESS,
  FETCH_FAIL,

  POST_REQUEST_FAIL,
  POST_REQUEST_STARTED,
  POST_REQUEST_SUCCESS,

  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_STARTED,

  PUT_REQUEST_FAIL,
  PUT_REQUEST_SUCCESS,
  PUT_REQUEST_STARTED,
} from './actionTypes';
import { ItemData } from '../models/ItemData';
import { IItemDTO } from '../interfaces/IItemDTO';

// region Frontend related action creators

export const cancelChange = (id: string): IAction => ({
  type: ITEM_CHANGE_CANCELLED,
  payload: {id},
});

export const makeEditable = (id: string): IAction => ({
  type: ITEM_MAKE_EDITABLE,
  payload: {id},
});

// endregion

// region GET related action creators

export const startFetchingItems = (): IAction => ({
  type: FETCH_STARTED,
});

export const fetchingSucceeded = (items: IItemDTO[]): IAction => ({
  type: FETCH_SUCCESS,
  payload: {
    items,
  },
});

export const fetchingFailed = (error: Error, retryAction: ThunkAction): IAction => ({
  type: FETCH_FAIL,
  payload: {
    error,
    retryAction,
  }
});

// endregion

// region POST related action creators

export const postStarted = (optimisticId: string, text: string): IAction => ({
  type: POST_REQUEST_STARTED,
  payload: {
    text,
    optimisticId,
  }
});

export const postSucceeded = (formerId: string, item: IItemDTO): IAction => ({
  type: POST_REQUEST_SUCCESS,
  payload: {
    item,
    formerId,
  },
});

export const postFailed = (id: string, error: Error, retryAction: ThunkAction): IAction => ({
  type: POST_REQUEST_FAIL,
  payload: {
    id,
    error,
    retryAction,
  }
});

// endregion

// region PUT related action creators

export const putStarted = (item: ItemData): IAction => ({
  type: PUT_REQUEST_STARTED,
  payload: {
    id: item.id,
    item,
  }
});

export const putSucceeded = (item: IItemDTO): IAction => ({
  type: PUT_REQUEST_SUCCESS,
  payload: {
    id: item.id,
    item,
  },
});

export const putFailed = (id: string, error: Error, retryAction: ThunkAction): IAction => ({
  type: PUT_REQUEST_FAIL,
  payload: {
    id,
    error,
    retryAction
  }
});

// endregion

// region DELETE related action creators

export const deleteStarted = (id: string): IAction => ({
  type: DELETE_REQUEST_STARTED,
  payload: {
    id,
  }
});

export const deleteSucceeded = (id: string): IAction => ({
  type: DELETE_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const deleteFailed = (id: string, error: Error, retryAction: ThunkAction): IAction => ({
  type: DELETE_REQUEST_FAIL,
  payload: {
    id,
    error,
    retryAction
  }
});

// endregion