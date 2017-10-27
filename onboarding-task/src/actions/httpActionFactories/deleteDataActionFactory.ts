import { Dispatch } from 'react-redux';
import { IItemDataActionDependencies } from './itemDataActionFactory';


export const deleteItemData = (
  dependencies: IItemDataActionDependencies,
  dispatch: Dispatch<any>,
  url: string,
  localId: string
) =>
  dependencies.operation(url)
    .then(() =>
      dispatch(dependencies.onSuccess(localId)))
    .catch((response: Error) =>
      dispatch(dependencies.onError(localId, response)));
