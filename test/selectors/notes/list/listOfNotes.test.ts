import {
  prepareNotesInitialState,
  prepareNote,
} from '../../../testUtils/prepareTestData';
import {
  getAllIds,
  getNoteById,
} from '../../../../src/selectors/notes/list/listOfNotes';

describe('Selector listOfNotes tests', () => {
  it('getNoteById test', () => {
    const notes = prepareNotesInitialState();
    const expectedNote = prepareNote('First test note', '1', false);

    const actualNote = getNoteById(notes, '1');

    expect(actualNote).toEqual(expectedNote);
  });

  it('getAllIds test', () => {
    const notes = prepareNotesInitialState();
    const expectedIds = ['1', '2'];

    const actualIds = getAllIds(notes);

    expect(actualIds).toEqual(expectedIds);
  });

  it('getAllIds return same object if called multiple times', () => {
    const notes = prepareNotesInitialState();

    const firstActualIds = getAllIds(notes);
    const secondActualIds = getAllIds(notes);

    expect(firstActualIds).toBe(secondActualIds);
  });
});