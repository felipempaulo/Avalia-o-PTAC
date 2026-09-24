/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

export default function NovoAviso() {
    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState(null)
    const [criado, setCriado] = useState(null)

    async function enviar (evento) {
        evento.preventDefault();
        setEnviando(true)
        setErro(null)
        setCriado(null)

        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: titulo, body: texto})
            })
            if (!resp.ok) {
                throw new Error(`Erro HTTP: ${resp.status}`)
            }
            const data = await resp.json()
            setCriado(data)
            setTitulo('')
            setTexto('')
        } catch (error) {
            setErro(error.message)
        } finally {
            setEnviando(false)
        }
    }

    return (
        <form onSubmit={enviar}>
        <div>
            <label htmlFor="titulo">Titulo</label>
            <input type="text" id="titulo" value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o titulo"></input>
        </div>
        <div>
            <label htmlFor="texto">Texto do aviso</label>
            <input type="text" id="texto" value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite o texto"></input>
        </div>
            <button disabled={enviando}>Publicar Aviso</button>
            {enviando && <p>Enviando...</p>}
            {erro && <p>Erro: {erro}</p>}
            {criado && <p>Criado com id: {criado.id} e titulo: {criado.titulo}</p>}
        </form>
    );
}