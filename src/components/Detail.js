import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from "react-router-dom";

export const Detail = () => {
    const [item, setItem] = useState(null)
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)

  
    const { id } = useParams();


    useEffect(() => {
        const pokemon = pokemons.filter(item => item.id === id)
        setItem(Object.assign({}, pokemon[0]))
        dispatch({type:'GET_ITEM', payload:pokemon[0]})
    }, [id, pokemons, dispatch])

    return (
        <>
            {(item && item.id) ? (<div className="flexwrap">
                <div className="flex left">
                    <div className="header_post">
                        <img src={item.image} alt="" />
                    </div>
                </div>
                <div className="flex right">
                    <div className="body_post">
                        <div className="post_content">
                            <h1>{item.name}</h1>
                            <div className="container_infos">
                                <div className="container_tags">
                                    <span>Tipo:</span>
                                    <div className="tags">
                                        <ul>
                                            {item.types &&
                                                item.types.map((type, idx) => {
                                                    return <li key={idx}>{type}</li>;
                                                })}
                                        </ul>
                                    </div>
                                </div>
                                {item.attacks && <div className="container_tags">
                                    <span>Ataques:</span>
                                    <div className="attacks">
                                        {item.attacks.fast && <h4>Rápidos</h4>}
                                        <ul>
                                            {item.attacks.fast &&
                                                item.attacks.fast.map((atk, idx) => {
                                                    return <li key={idx}>{atk.name}</li>;
                                                })}
                                        </ul>

                                        {item.attacks.special && <h4>Especiais</h4>}
                                        <ul>
                                            {item.attacks.special &&
                                                item.attacks.special.map((atk, idx) => {
                                                    return <li key={idx}>{atk.name}</li>;
                                                })}
                                        </ul>

                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <Link to={`/edt/${item.id}`}>Editar</Link>
                    {' | '}
                    <Link to='/'>Voltar</Link>
                </div>

            </div>) : <h4>Nenhum registro encontrato</h4>}
        </>
    )
}