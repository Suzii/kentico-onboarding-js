import {
  addNewItem,
  changeItemOpenState,
  deleteItem,
  fetchFailed,
  notifyError,
  notifySuccess,
  receiveItems,
  registerAction,
  requestItems,
  saveItemChanges,
} from '../actionCreators';
import { fetchItemsFactory } from './fetchItemsFactory';
import { postItemFactory } from './postItemFactory';
import { deleteItemFactory } from './deleteItemFactory';
import { saveNewTextFactory } from './saveNewTextFactory';
import { changeItemOpenStateFactory } from './changeItemOpenStateFactory';
import { handleErrors } from './utils/handleErrors';

const configurationObjectBase = {
  fetch,
  registerAction,
  handleErrors,
};

export const fetchItemsAsync = fetchItemsFactory({
  ...configurationObjectBase,
  requestItems,
  receiveItems,
  fetchFailed,
});
export const postItemAsync = postItemFactory({
  ...configurationObjectBase,
  addNewItem,
  notifySuccess,
  notifyError,
});

export const deleteItemAsync = deleteItemFactory({
  ...configurationObjectBase,
  deleteItem,
  notifySuccess,
  notifyError,
});

export const changeItemOpenStateAsync = changeItemOpenStateFactory({
  ...configurationObjectBase,
  changeItemOpenState,
  notifyError,
});

export const saveNewTextAsync = saveNewTextFactory({
  ...configurationObjectBase,
  saveItemChanges,
  notifySuccess,
  notifyError,
});
