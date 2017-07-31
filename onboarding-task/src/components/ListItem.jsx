import React from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from '../components/ViewItem';
import { EditItem } from '../components/EditItem';

const ListItem = (props) => {
  let item = (props.item.isBeingEdited) ?
    <EditItem
      item={props.item}
      onDelete={props.onDelete}
      onSave={props.onSave}
      onCancel={props.onCancel}
    /> :
    <ViewItem
      item={props.item}
      onClick={props.onClick}
    />;

  return (
    <span>
      {item}
    </span>);
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
