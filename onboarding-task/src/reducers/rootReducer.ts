import { nodesListReducer } from './listReducers/nodesListReducer';
import { IAppState } from './IAppState';
import { IAction } from '../actions/actionCreators';

export const rootReducer = (state: IAppState = {} as IAppState, action: IAction): IAppState => ({
  nodesList: nodesListReducer(state.nodesList, action),
});

