import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IListDataProps,
  List as ListComponent,
} from '../components/List';
import { IAppState } from '../models/state/IAppState';
import { Dispatch } from 'redux';
import { fetchItemsAsync } from '../actions/thunk';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  fetchItemsState: state.list.fetchItemsState,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>) => ({
  fetchItems: (uri: string) =>
    dispatch(
      fetchItemsAsync({
        uri,
      })),
});

export const List: ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);
