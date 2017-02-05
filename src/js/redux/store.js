import { createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'js/redux/reducers';

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];

  if (process.env.NODE_ENV === `development`) {
    const createLogger = require(`redux-logger`);
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(...middlewares)
    )
  return store;
}
