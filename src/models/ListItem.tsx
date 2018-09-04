import { Record } from 'immutable';

const emptyItem: IListItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isEdited: false,
};

interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
}

export class ListItem extends Record(emptyItem, 'ListItem') {
  id: Uuid;
  text: string;
  isEdited: boolean;

  constructor(params?: Partial<IListItem>) {
    params ? super(params) : super();
  }

  with(values: Partial<IListItem>): ListItem {
    return this.merge(values) as this;
  }
}
