import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IItemSyncRequest } from '../../models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../models/enums/SyncOperation';

interface ISaveNewTextFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly saveItemChanges: (id: Guid, text: string) => IAction;
  readonly itemSyncSucceeded: (itemSyncRequest: IItemSyncRequest) => IAction;
  readonly itemSyncFailed: (itemSyncRequest: IItemSyncRequest) => IAction;
}

export interface ISaveNewTextActionParams {
  readonly id: Guid;
  readonly text: string;
}

export const saveNewTextFactory = (deps: ISaveNewTextFactoryDependencies) =>
  ({ id, text }: ISaveNewTextActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem = {
        text,
        isBeingEdited: false,
        id,
      };

      const itemSyncRequest: IItemSyncRequest = {
        id,
        operation: SyncOperation.Modify,
      };

      dispatch(deps.saveItemChanges(id, text));

      return deps.httpClient.patch(deps.uri + id, updatedItem)
        .then(() => dispatch(deps.itemSyncSucceeded(itemSyncRequest)))
        .catch(() => dispatch(deps.itemSyncFailed(itemSyncRequest)));
    };
