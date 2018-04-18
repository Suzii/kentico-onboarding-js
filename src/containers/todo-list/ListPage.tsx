import { connect, Dispatch } from 'react-redux';
import {
  ListPage,
  IFetchCallbackProps,
  IFetchDataProps
} from '../../components/todo-list/ListPage';
import { fetchItems } from '../../actions';
import { IAppState } from '../../models/IAppState';
import { closeFetchError, startFetching } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IFetchDataProps => ({
  listPageState: state.listPageState,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IFetchCallbackProps => ({
  onFetchItems: () => dispatch(fetchItems()),
  onFetchErrorClose: () => dispatch(closeFetchError()),
  onFetchStart: () => dispatch(startFetching())
});

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ListPage);

export { connectedComponent as ListPage };
