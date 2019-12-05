import { combineReducers } from 'redux';
import tdReducer from './td.reducer';

//Reducer - Usados ​​para atualizar o state do objeto na store.

export default combineReducers({
    td: tdReducer
});
