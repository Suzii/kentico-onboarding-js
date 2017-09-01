import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';
import { IAction } from './IAction';

export const addNode = addNodeFactory(generateId);

export const toggleNode = (id: IdType): IAction => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const deleteNode = (id: IdType): IAction => ({
  type: DELETE_NODE,
  payload: {
    id,
  },
});

export const saveNode = (id: IdType, text: string): IAction => ({
  type: SAVE_NODE,
  payload: {
    id,
    text,
  },
});

export const fetchNodes = (): any =>
  (dispatch: any) => {
    dispatch(addNode('weeeee'));
    return fetch('api/v1/nodes')
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error));
  };

