import { OrderedMap } from 'immutable';
import { ItemRecord } from '../models/ItemRecord';
import { generateId } from './generateId';

export const getInitialItems = () => {
  const dog = new ItemRecord({
    id: generateId(),
    text: 'Dog'
  });
  const cat = new ItemRecord({
    id: generateId(),
    text: 'Cat'
  });
  const elephant = new ItemRecord({
    id: generateId(),
    text: 'Elephant'
  });

  return OrderedMap({
    [dog.id]: dog,
    [cat.id]: cat,
    [elephant.id]: elephant,
  });
};
