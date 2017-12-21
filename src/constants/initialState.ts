import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { createNewId } from '../utils/createNewId';

const itemId1 = createNewId();
const itemId2 = createNewId();
const itemId3 = createNewId();

export const initialState = {
  list: {
    items: OrderedMap(
      {
        [itemId1]: new ListItem({
          id: itemId1,
          text: 'text',
        }),
        [itemId2]: new ListItem({
          id: itemId2,
          text: 'text2',
        }),
        [itemId3]: new ListItem({
          id: itemId3,
          text: 'text3',
        }),
      }),
  },
};