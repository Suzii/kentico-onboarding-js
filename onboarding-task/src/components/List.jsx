import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ExistingItem from '../containers/ExistingItem';
import NewItem from '../containers/NewItem';

const List = ({ items }) => (
  <div className="row">
    <div className="col-sm-12 col-md-offset-2 col-md-8">
      <ul className="list-group">
        {items
            .valueSeq()
            .map((item, index) => (
              <li
                key={item.id}
                className="list-group-item"
              >
                <ExistingItem
                  index={index + 1}
                  item={item}
                />
              </li>))}
        <li className="list-group-item">
          <NewItem />
        </li>
      </ul>
    </div>
  </div>
);

List.propTypes = {
  items: ImmutablePropTypes.orderedMapOf(
    ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    PropTypes.string,
  ),
};

export default List;
