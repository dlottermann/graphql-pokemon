import { createStore } from 'redux';

const initialState = {
    pokemons: [],
    page: 40,
    loading: false,
    pokemon:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL':
            return { ...state, pokemons: action.payload, loading: false }
        case 'GET_ITEM':
            return { ...state, pokemon: action.payload, loading: false }
        case 'ADD_ITEM':
            const newState = state.pokemons.filter(i => i.id === action.payload.pokemon.id)
            if (newState.length <= 0) {
                return { ...state, pokemons: [...state.pokemons, action.payload.pokemon], loading: false }
            } else {
                return { ...state, loading: false }
            }
        case 'LOADING':
            return { ...state, loading: action.payload }
        case 'LOAD_MORE':
            return { ...state, page: state.page + 5, loading: true }
        case 'UPDATE':
            const updateState = Object.values(state.pokemons).map(item => {
                if (item.id !== action.payload.id) {
                  return item;
                }
                return {
                  ...item,
                  name: action.payload.name,
                  types: action.payload.types,
                };
              });
            return { ...state, pokemons:updateState }
        default:
            return state
    }
}

const store = createStore(reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() enable redux tools on dev enviroment
    );

export default store;