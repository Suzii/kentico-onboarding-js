import { Note } from '../models/Note';

export const prepareNotesForStoring = (notes) => (
  notes
    .valueSeq()
    .map(({ text, id: noteId }) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (notes) => (
  notes
    .map(note => ([
      note.noteId,
      new Note({
        ...note,
        isEditActive: false,
      }),
    ]))
);
