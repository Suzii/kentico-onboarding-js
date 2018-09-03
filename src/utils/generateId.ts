import { v4 as uuidv4 } from 'uuid';

export const generateId = () => uuidv4();
export type Uuid = string;
