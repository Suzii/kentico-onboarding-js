import { connect } from 'react-redux';
import memoize from 'memoizee';
import { Item } from '../../components/todo-list/Item';
import { IAppState } from '../../IAppState';
import {
  createIndexedItem,
} from '../../selectors/createIndexedItem';
import { ListItem } from '../../models/ListItem';
import { PropTypes } from 'react';
import { IndexedItem } from '../../models/IndexedItem';

const createIndexedItemMemoized = memoize(createIndexedItem);

interface IProps {
  id: string;
  index: number;
}

const mapStateToProps = ({todoList: {items}}: IAppState, {id, index}: IProps) => {
  const retrievedItem: ListItem = items.get(id);
  const indexedItem: IndexedItem = createIndexedItemMemoized(
    retrievedItem,
    index);

  return { item: indexedItem };
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };