import React from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem.tsx';
import { EditItem } from './EditItem.tsx';

const ListItem = (props) => {
  if (props.item.isBeingEdited) {
    return (<EditItem
      item={props.item}
      onDelete={props.onDelete}
      onSave={props.onSave}
      onCancel={props.onCancel}
    />);
  }

  return (<ViewItem
    item={props.item}
    onClick={props.onClick}
  />);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export { ListItem };
