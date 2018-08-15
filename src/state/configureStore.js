import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '@state'
import rootSaga from '@state/sagas'

const sagaMiddleware = createSagaMiddleware()

let middlewares = [ sagaMiddleware ];
let enhacers = [];

const reducers = persistCombineReducers({
  key: 'root',
  storage,
}, rootReducer)

export default () => {
  const enhancer = compose(applyMiddleware(...middlewares), ...enhacers)
  const store = createStore(reducers, enhancer)
  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return store
}