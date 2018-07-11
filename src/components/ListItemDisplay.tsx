import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItemViewModel } from '../models/IItemViewModel';

export interface IListItemDisplayOriginalProps {
  readonly item: IItemViewModel;
}

export interface IListItemDisplayDispatchProps {
  readonly onEdit: () => void;
}

interface IListItemDisplayProps extends IListItemDisplayDispatchProps, IListItemDisplayOriginalProps {}

export const ListItemDisplay: React.StatelessComponent<IListItemDisplayProps>
  = ({ item: { value, bullet, localOnly }, onEdit }) => {
  const badge = localOnly
    ? <span className="badge badge-pill progress-bar-warning pull-right">Local</span>
    : null;

  return (
    <div onClick={onEdit}>
      {bullet}.&nbsp;
      {value}
      {badge}
    </div>
  );
};

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  item: PropTypes.shape({
    bullet: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    localOnly: PropTypes.bool.isRequired,
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
};