import { connect } from 'react-redux';

import {
  IListItemStateProps,
  ListItem as ListItemComponent,
} from '../components/ListItem';
import { createMemoizedBulletItem } from '../selectors/memorySelector';
import { IState } from '../store/IState';
import { Key } from '../@types/Key';

interface IOwnProps {
  readonly itemKey: Key;
  readonly bullet: string;
}

const mapStateToProps =
  ({ list: { items }}: IState, { itemKey, bullet }: IOwnProps): IListItemStateProps => ({
    item: createMemoizedBulletItem(items.get(itemKey), bullet),
  });

export const ListItem = connect(mapStateToProps)(ListItemComponent);
