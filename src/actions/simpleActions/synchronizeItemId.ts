import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';

export const synchronizeItemId = (oldId: ItemId, newId: ItemId) => ({
  type: actionTypes.SYNCHRONIZE_ITEM_ID,
  payload: {
    oldId,
    newId
  }
});
