import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

/*
A store contém toda a árvore de estados do aplicativo. 
A única maneira de alterar o estado dentro dele é despachar uma ação nele. 
Contém um objeto e seus métodos.
*/

const initialState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare)) 
);


export default store;