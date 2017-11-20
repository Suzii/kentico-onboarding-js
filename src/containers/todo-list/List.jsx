import { connect } from 'react-redux';
import { List } from '../../components/todo-list/List';

const mapStateToProps = (state) => ({
  items: state.list.items,
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
