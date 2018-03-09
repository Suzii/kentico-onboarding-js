import { IListItem } from '../interfaces/IListItem';
import { defaultUuid } from '../../constants/defaultUuid';
import { TypedRecord } from './TypedRecord';
import { Guid } from '../Guid';

const defaultItem: IListItem = {
  id: defaultUuid,
  text: '',
  syncedText: '',
  isBeingEdited: false,
};

export class ListItem extends TypedRecord(defaultItem) implements IListItem {
  readonly id: Guid;
  readonly text: string;
  readonly syncedText: string;
  readonly isBeingEdited: boolean;
}
