import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';
import { IIndexedItem } from './IIndexedItem';

const emptyIndexedItem: IIndexedItem = {
  index: null,
  id: defaultId,
  text: '',
  isEdited: false,
};

export class IndexedItem extends Record(emptyIndexedItem) implements IIndexedItem {
  readonly index: number | null;
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;

  constructor(params?: Partial<IIndexedItem>) {
    params ? super(params) : super();
  }
}
