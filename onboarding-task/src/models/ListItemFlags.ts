import { TypedRecord } from './TypedRecord';

/**
 * List Item Flags Model
 */
interface IListItemFlags {
  /** Shows whether the item is opened for editation */
  readonly isBeingEdited: boolean;
  /** Shows whether the item was saved successfully on the server */
  readonly isSavedSuccess: boolean;
}

const defaultValues: IListItemFlags = {
  isBeingEdited: false,
  isSavedSuccess: true,
};

/**
 * Represents flags on an item
 */
export class ListItemFlags extends TypedRecord<IListItemFlags>(defaultValues) implements IListItemFlags {
  readonly isBeingEdited: boolean;
  readonly isSavedSuccess: boolean;
}
