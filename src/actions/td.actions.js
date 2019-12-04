import axios from 'axios';
import { GET ,GET_TD, ADD, UPDATE, DELETE, SEARCH, LOADING } from '../actions/types';
//Objetos JavaScript que enviam dados do seu aplicativo para a store.
//Implementacao das acoes - Interage com o reducer - Faz as requisicoes para o backend:
  // Acessa o SWITCH do reducer:
export const get = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/td/')
    .then( res => 
      dispatch({
        type: GET,
        payload: res.data
      })
    )
    .catch(err =>
        console.log('Falha ao localizar catalogo: ' + err.response.data + err.response.status)
    );
};

export const getTD = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/td/${id}`,id)
    .then(res =>
      dispatch({
        type: GET_TD,
        payload: id
      })
    )
    .catch(err =>
      console.log('Falha ao localizar TD: ' + err.response.data + err.response.status)
    );
};

export const add = td => dispatch  => {
  axios
    .post('/td/add', td)
    .then( res => 
      dispatch({
        type: ADD,
        payload: res.data
      })
    )
    .catch(err =>
        console.log('Falha ao armazenar: ' + err.response.data + err.response.status)
    );
};

export const deleteTD = id => dispatch => {
  axios
    .delete(`/td/delete/${id}`, id)
    .then(res =>
      dispatch({
        type: DELETE,
        payload: id
      })
    )
    .catch(err =>
        console.log('Falha ao deletar TD: ' + err.response.data + err.response.status)
    );
};

export const updateTD = id => dispatch => {
  axios
    .post(`/td/update/${id}`, id)
    .then(res =>
      dispatch({
        type: UPDATE,
        payload: id
      })
    )
    .catch(err =>
        console.log('Falha ao editar TD: ' + err.response.data + err.response.status)
    );
};

export const search = consult => dispatch => {
  console.log("Action SEARCH acionada - consulta = " + consult)
  axios
    .post('/td/search/', {consult})
    .then(res =>
      dispatch({
        type: SEARCH,
        payload: res.data
      })
    )
    .catch(err => console.log('Falha ao localizar consulta: ')
    );
}; 

export const setLoading = () => {
  return {
    type: LOADING
  };
};