import { connect } from 'react-redux';
import { itemsSelector } from '../selectors/itemsSelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  items: itemsSelector(state.items.valueSeq())
});

export const List = connect(
  mapStateToProps,
)(ListComponent);
