import React = require('react');

import { IAction } from '../interfaces/IAction';
import { ListItemSavedFlag } from './ListItemSavedFlag';

interface ListItemLabelProps {
  text: string;
  index: number;
  savedOnServer: boolean;
  onClick: () => IAction;
}

const ListItemLabel = ({ text, index, onClick, savedOnServer }: ListItemLabelProps) =>
  <div onClick={onClick}><span className="col-md-10">{index}. {text}</span> <ListItemSavedFlag saved={savedOnServer} /></div>;

export { ListItemLabel };
