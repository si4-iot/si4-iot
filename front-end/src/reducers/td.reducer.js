import { GET ,GET_TD, ADD, UPDATE, DELETE, SEARCH, LOADING } from '../actions/types';

const initialState = {
    descriptions: [],
    description: [],
    loading: false
};
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case GET:
            return {
                ...state,
                descriptions: action.payload,
                loading: false
            };
        case DELETE:
            return {
                ...state,
                descriptions: state.descriptions.filter(description => description._id !== action.payload)
            };
        case GET_TD:
            return {
                ...state,
                description: state.descriptions.find(desc => desc._id === action.payload)
            };
        case ADD:
            return {
                ...state,
                descriptions: [action.payload, ...state.descriptions]
            };
        case UPDATE:
            const response = action.payload
            const updatedDesc = state.descriptions.map((desc) => {
                if (desc._id !== response._id) {
                    return desc;
                }
                return [action.payload, ...state.description]
            })
            return {
                ...state,
                descriptions : updatedDesc
            };
        case SEARCH:
            console.log(action.payload)
            return {
                ...state,
                description: action.payload
            };
        case LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
  }