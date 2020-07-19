import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from "@rocketseat/unform";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required("Nome é obrigatório!"),
    type: Yup.string().required("Tipo é obrigatório!"),
  });


export const FormEdt = ({ id }) => {
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemon)

    const [message, setMessage] = useState("");
    const [docId, setDocId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        setDocId(pokemon.id)
        setName(pokemon.name)
        setType(pokemon.types)
    },[pokemon])


    const handleSubmit = data => {
        const types = data.type.split(',');
        data.types = types;
        delete data.type;
        console.log(data)
          dispatch({
            type: "UPDATE",
            payload: data
          });
    
        setMessage("Sucesso!");
     
    }

    return (
        <>
        <h5>Editando informações</h5>
        <div className="formGroup">
          {message && <h3>{message}</h3>}
          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="id" value={docId} type="hidden" />
            <label>Nome</label>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label>Tipo</label>
            <Input
              name="type"
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
            />
            <legend>Para mais tipos, separe por virgula (Ex: Fire, Poison, etc. )</legend>
            <p>          
            <button className="btn" type="submit">
              Save
            </button>
            <Link to="/">Voltar</Link>
            </p>
          </Form>
        </div>
      </>
    )
}
