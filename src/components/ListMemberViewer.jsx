import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export class ListMemberViewer extends PureComponent {

  static propTypes = {
    note: ImmutablePropTypes.recordOf({
      text: PropTypes.string.isRequired,
      isEditActive: PropTypes.bool.isRequired,
    }),
    number: PropTypes.number.isRequired,
    onTextClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <p onClick={this.props.onTextClick}>{this.props.number + '. ' + this.props.note.text}</p>
    );
  }
}