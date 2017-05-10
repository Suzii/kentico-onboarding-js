import * as React from 'react';
import * as Immutable from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { ErrorMessage } from '../models/ErrorMessage';

interface IErrorViewerDataProps {
  errorList: Immutable.OrderedMap<string, ErrorMessage>;
}

const ErrorViewer: React.StatelessComponent<IErrorViewerDataProps> = (props) => {
  const errors = props.errorList.map((error: ErrorMessage, id) => (
    <div key={ id } className="alert alert-danger">
      { error.message }
    </div>
    )
  ).toIndexedSeq();

  return (
    <div>
      { errors }
    </div>
  );
};

ErrorViewer.displayName = 'ErrorViewer';
ErrorViewer.propTypes = {
  errorList: ImmutablePropTypes.orderedMapOf(
    React.PropTypes.shape({
      message: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export { ErrorViewer, IErrorViewerDataProps };
