import * as React from 'react';
import { IAction } from '../actions/IAction';
import '../loader.css';


interface IListLoaderDataProps {
  isLoading: boolean;
}

interface IListLoaderCallbacksProps {
  load: () => Promise<IAction>;
}

const LoaderComponent: React.StatelessComponent<{}> = () => (
  <div>
    <div className="rainbow">
      <span/>
    </div>
    <div className="nyan-cat">
      <div className="feet"/>
      <div className="tail">
        <span/>
      </div>
      <div className="body"/>
      <div className="head"/>
    </div>
  </div>);

const loader = (LoadedComponent: React.ComponentClass<{}>) =>
  class extends React.PureComponent<IListLoaderDataProps & IListLoaderCallbacksProps, undefined> {
    static displayName = `loader(${LoadedComponent.displayName})`;

    componentDidMount() {
      this.props.load();
    }

    render() {
      if (this.props.isLoading) {
        return (
          <LoaderComponent/>
        );
      } else {
        return <LoadedComponent/>;
      }
    }
  };


export { loader, IListLoaderDataProps, IListLoaderCallbacksProps };
