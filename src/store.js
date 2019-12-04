
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

/*
A store contém toda a árvore de estados do aplicativo. 
A única maneira de alterar o estado dentro dele é despachar uma ação nele. 
Contém um objeto e seus métodos.
*/

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


export default store;