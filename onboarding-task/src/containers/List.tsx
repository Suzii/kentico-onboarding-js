import { connect } from 'react-redux';

import { IListCallbacksProps, IListDataProps, List as ListComponent } from '../components/List';

import { Store } from '../reducers/stores';
import { fetchData, postData} from '../actions/actionCreators';


const mapStateToProps = ({ items }: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
});

const mapDispatchToProps = (dispatch: any): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(postData(value)),
  onFetchData: () => dispatch(fetchData()),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
