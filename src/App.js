import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from "@apollo/client";
import ReactLoading from "react-loading";

import { Cards, SearchBar } from './components'
import { useHandleScroll } from './hooks';
import { GET_ALL } from './services';

function App() {
  const [items, setItems] = useState([]);
  const [itemSearch, setItemSearch] = useState([]);
  const [empty, setEmpty] = useState(false);

  const loader = useSelector(state => state.loading)
  const page = useSelector(state => state.page)
  const pokemons = useSelector(state => state.pokemons)

  const dispatch = useDispatch();

  useHandleScroll();

  const handleSearch = searchParam => {
    if (searchParam) {
      const results = pokemons.filter(item => item.name.toLowerCase().includes(searchParam))
      setItems(results);
    } else {
      setEmpty(false);
      setItems(pokemons)
    }
  }

  useEffect(() => {
    setItems(pokemons)    
  }, [pokemons])

  useEffect(() => {
    if (itemSearch.length>0) setItems(itemSearch)
  }, [itemSearch])


  //Load content
  const { data, loading, error } = useQuery(GET_ALL, {
    variables: { first: page }
  });

  useEffect(() => {
    if (data && data.pokemons) {
      dispatch({
        type: "GET_ALL",
        payload: data.pokemons
      });

    }
  }, [data, dispatch]);

  if (loading && !loader) {
    dispatch({ type: 'LOADING', payload: true })
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }




  return (
    <div className="App">
      <h3>Bem vindo graphql pokédex</h3>
      <SearchBar handleSearch={handleSearch} setItemSearch={setItemSearch} setEmpty={setEmpty} />
      {items && <Cards items={items} />}
      {empty && <h4>Nenhum resultado encontrado</h4>}
      {loader ? <ReactLoading type='spin' width={60} className="loader" color="#404040" /> : null}
    </div>
  );
}

export default App;
