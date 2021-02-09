import createStore from './redux/store';
import reducer from './redux/reducers';

const store = createStore(reducer);

export default store;