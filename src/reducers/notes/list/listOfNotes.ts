import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';
import {
  CANCEL_EDITING_NOTE,
  CANCEL_FAILED_ADD_ACTION,
  CANCEL_FAILED_DELETE_ACTION,
  CANCEL_FAILED_UPDATE_ACTION,
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  LOADING_NOTES_SUCCESS,
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
  START_EDITING_NOTE,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER,
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS,
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';
import { FailedAction } from '../../../enums/failedAction';

const addNote = (state: OrderedMap<Guid, Note>, payload: { noteId: Guid, text: string, isCommunicating: boolean }): OrderedMap<Guid, Note> => {
  const { noteId, text, isCommunicating } = payload;
  const noteToAdd = new Note({
    id: noteId,
    text,
    isCommunicating,
  });

  return state
    .set(noteId, noteToAdd);
};

const deleteNote = (state: OrderedMap<Guid, Note>, payload: { noteId: Guid }): OrderedMap<Guid, Note> =>
  state.delete(payload.noteId);

const updateNote = (state: OrderedMap<Guid, Note>, updatedNote: Partial<Note>, noteId: Guid): OrderedMap<Guid, Note> =>
  state.update(noteId, note => note.with(updatedNote));

const addLoadedNotes = (payload: { notes: Iterable<[Guid, Note]> }): OrderedMap<Guid, Note> =>
  OrderedMap(payload.notes);

const updateNoteOnFailure = (state: OrderedMap<Guid, Note>, failedAction: FailedAction, payload: { errorDescription: string, noteId: Guid }) =>
  updateNote(state, { isEditActive: false, isCommunicating: false, communicationError: payload.errorDescription, failedAction, }, payload.noteId);

const addServerSynchronizedNote = (state: OrderedMap<Guid, Note>, payload: { noteId: Guid, text: string, isCommunicating: boolean, localNoteId: Guid }) => {
  const deletedNoteState = deleteNote(state, { noteId: payload.localNoteId });
  return addNote(deletedNoteState, payload);
};

export const listOfNotes = (state = OrderedMap<Guid, Note>(), action: IAction): OrderedMap<Guid, Note> => {
  switch (action.type) {
    case LOADING_NOTES_SUCCESS:
      return addLoadedNotes(action.payload);

    case START_SENDING_NOTE_TO_SERVER:
      return addNote(state, action.payload);

    case START_RESENDING_NOTE_TO_SERVER:
      return updateNote(state, { isCommunicating: true, communicationError: '' }, action.payload.localNoteId);

    case SENDING_NOTE_TO_SERVER_SUCCESS:
      return addServerSynchronizedNote(state, action.payload);

    case UPDATING_NOTE_ON_SERVER_SUCCESS:
      return updateNote(state, { text: action.payload.text, isCommunicating: false, failedAction: FailedAction.NO_FAILURE, communicationError: '' }, action.payload.noteId);

    case START_EDITING_NOTE:
      return updateNote(state, { isEditActive: true }, action.payload.noteId);

    case CANCEL_EDITING_NOTE:
      return updateNote(state, { isEditActive: false }, action.payload.noteId);

    case START_UPDATING_NOTE_ON_SERVER:
      return updateNote(state, { isEditActive: false, isCommunicating: true, text: action.payload.newText }, action.payload.noteId);

    case START_DELETING_NOTE_FROM_SERVER:
      return updateNote(state, { isEditActive: false, isCommunicating: true }, action.payload.noteId);

    case DELETING_NOTE_FROM_SERVER_FAILURE:
      return updateNoteOnFailure(state, FailedAction.DELETE, action.payload);

    case SENDING_NOTE_TO_SERVER_FAILURE:
      return updateNoteOnFailure(state, FailedAction.ADD, action.payload);

    case UPDATING_NOTE_ON_SERVER_FAILURE:
      return updateNoteOnFailure(state, FailedAction.UPDATE, action.payload);

    case DELETING_NOTE_FROM_SERVER_SUCCESS:
      return deleteNote(state, action.payload);

    case CANCEL_FAILED_DELETE_ACTION:
    case CANCEL_FAILED_UPDATE_ACTION:
      return updateNote(state, { isEditActive: false, isCommunicating: false, communicationError: '', failedAction: FailedAction.NO_FAILURE }, action.payload.noteId);

    case CANCEL_FAILED_ADD_ACTION :
      return deleteNote(state, action.payload);

    default:
      return state;
  }
};
