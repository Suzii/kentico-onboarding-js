const ImmutablePropTypes = require('react-immutable-proptypes');
const Loading = require('react-loading-animation');
import * as React from 'react';
import { List as ImmutableList, OrderedMap } from 'immutable';
import { HotKeys } from 'react-hotkeys';

import { Error } from '../containers/Error';
import { AddNode } from '../containers/AddNode';
import { Node } from '../containers/Node';
import { IKeyMap } from '../@types/IKeyMap';

export interface IListDataProps {
  nodesIds: ImmutableList<Guid>;
  isFetching: boolean;
  errors: OrderedMap<Guid, string>;
}

export interface  IListCallbacksProps {
  fetchNodes: any;
}

const keyMap: IKeyMap = {
  'cancelNode': 'esc',
  'saveNode': 'enter',
  'deleteNode': 'ctrl+del',
};

export class List extends React.PureComponent<IListDataProps & IListCallbacksProps> {
  static displayName = 'List';
  static propTypes = {
    nodesIds: ImmutablePropTypes.list.isRequired,
  };

  constructor(props: IListDataProps & IListCallbacksProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNodes();
  }

  render() {
    const
      nodes = this.props.nodesIds
        .map((id: Guid, index: number) => (
          <li className="list-group-item" key={id} >
            <Node
              id={id}
              index={index}
            />
          </li>
        ));

    const
      errors = this.props.errors.keySeq()
        .map((id: Guid) => (
            <Error id={id} key={id}/>
        ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <Loading isLoading={this.props.isFetching}>
            <ul className="list-group">
              <HotKeys keyMap={keyMap}>
                {nodes}
                <li className="list-group-item">
                  <AddNode />
                </li>
                {errors}
              </HotKeys>
            </ul>
          </Loading>
        </div>
      </div>
    );
  }
}
