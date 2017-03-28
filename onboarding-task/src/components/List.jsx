import React, { Component } from 'react';
import { NewListItem } from './NewListItem';
import { InsertedListItem } from './InsertedListItem';
import { EditedListItem } from './EditedListItem';
import assignment from './../../../assignment.gif';

import TsComponent from './TsComponent.tsx';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  _guid = () => {
    return this._s4() + this._s4() + '-' + this._s4() + '-' + this._s4() + '-' +
      this._s4() + '-' + this._s4() + this._s4() + this._s4();
  };
  _s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  _addItem = (text) => {
    const newItems = this.state.items.slice();
    newItems.push({ // rename
      textInfo: text,
      editing: false,
    });
    this.setState({ items: newItems });
  }
  // TODO edit and save contain a lot of duplicate code, refactor
  _edit = (index) => {
    console.log('edit called');
    const newItems = this.state.items.slice();
    newItems[index].editing = true;
    this.setState({ items: newItems });
  };
  _save = (index, text) => {
    console.log('save called');
    const newItems = this.state.items.slice();
    newItems[index].editing = false;
    newItems[index].textInfo = text;
    this.setState({ items: newItems });
  };
  _delete = (index) => {
    const newItems = this.state.items.filter((_, i) => i !== index);
    this.setState({ items: newItems });
  };
  render() {
    const listItems = this.state.items.map((x, i) => {
      if (x.editing) {
        return <EditedListItem text={x.textInfo} index={i} saveFunction={this._save} deleteFunction={this._delete} key={this._guid()} />;  // TODO implement functions, generate correct unique keys
      }
      return <InsertedListItem text={x.textInfo} index={i} editFunction={this._edit} key={this._guid()} />;
    }
    );
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              {listItems}
              <NewListItem addFunction={this._addItem} />
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export { List };
