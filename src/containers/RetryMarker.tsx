import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IRetryMarkerCallbackProps,
  IRetryMarkerDataProps,
  RetryMarker as RetryMarkerComponent
} from '../components/RetryMarker';
import { IAppState } from '../reducers/IAppState';
import { ItemId } from '../models/ItemId';
import {
  updateItem,
  uploadItemAgain
} from '../actions';
import { IAction } from '../actions/IAction';
import { Dispatch } from 'redux';

export interface IRetryMarkerContainerProps {
  id: ItemId;
}

const mapStateToProps = (state: IAppState, {id}: IRetryMarkerContainerProps): IRetryMarkerDataProps => {
  const item = state.items.byId.get(id);
  return {
    text: item.text,
    textUpdate: item.textUpdate,
    errorMessages: item.errorMessages,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IRetryMarkerContainerProps): IRetryMarkerCallbackProps => ({
  onSaveAgain: (text: string) => updateItem(dispatch)(id, text),
  onUploadAgain: (text: string) => uploadItemAgain(id)(dispatch)(text),
});


export const RetryMarker: ComponentClass<IRetryMarkerContainerProps> = connect(mapStateToProps, mapDispatchToProps)(RetryMarkerComponent);
