import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useLazyQuery } from "@apollo/client"
import { GET } from '../services';

export const SearchBar = ({ handleSearch, setItemSearch, setEmpty }) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const [loadGreeting, { called, loading, data }] = useLazyQuery(
    GET
  );
  if (called && loading) {
    dispatch({ type: 'LOADING', payload: true })
  }

  useEffect(() => {
    if (data && data.pokemon) {
      dispatch({ type: 'ADD_ITEM', payload: data })
      setItemSearch([data.pokemon])
    }else if (data && data.pokemon === null){
      dispatch({ type: 'LOADING', payload: false })
      setEmpty(true);
    }
  }, [data, dispatch,setItemSearch,setEmpty]);


  return (
    <>
      <div className="search-container">
        <input type="text" id="search-bar"
          onKeyUp={(e) => e.keyCode === 13 ? loadGreeting({ variables: { name: search } }) : setSearch(e.target.value)}
          placeholder="Digite o nome do pokémon..."
          onChange={e => handleSearch(e.target.value)}
        />
        <legend>Aperte enter para buscar</legend>
      </div>
    </>
  );
};

