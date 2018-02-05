import { connect, Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../../actions/IAction';
import { apiCallSuccess } from '../../actions/index';
import { ITEMS_FETCH_SUCCESS } from '../../constants/actionTypes';
import { Error, IErrorCallbackProps, IErrorDataProps } from '../../components/todo-list/Error';

const mapStateToProps = (state: IAppState): IErrorDataProps => ({
  errorMessage: state.fetchStatus.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IErrorCallbackProps => ({
  onErrorClose: (): IAction => dispatch(apiCallSuccess(ITEMS_FETCH_SUCCESS)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(Error);

export { connectedComponent as Error };