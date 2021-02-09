import { compose, createStore as _createStore } from 'redux';

/**
 * Create store functions that take into account the NODE_ENV environment variable
 * @param {function} reducer - App reducer
 */
function createStore(reducer) {
  if (process.env.NODE_ENV === 'development') {
    return _createStore(
      reducer,
      undefined,
      compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // include devToolsExtension, disable in prod
      ),
    );
  }
  return _createStore(reducer);
}

export default createStore;
