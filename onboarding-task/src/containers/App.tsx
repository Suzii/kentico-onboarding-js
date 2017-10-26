import { App as AppComponent } from '../components/App';
import { connect } from 'react-redux';
import { Store } from '../reducers/stores';

const mapStateToProps = ({ app: { list: { showLoader, fetchHasFailed } } }: Store.IRoot) => ({
  showLoader: showLoader,
  fetchHasFailed: fetchHasFailed,
});

const App = connect(
  mapStateToProps
)(AppComponent);

export { App };
