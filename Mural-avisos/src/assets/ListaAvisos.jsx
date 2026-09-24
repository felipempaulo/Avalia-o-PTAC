/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

export default function ListaAvisos({
    avisos, onEditar, onExcluir, excluirId
}) {
    return (
        <ul>
            {avisos.map((avisos) => (
                <li key={avisos.id}>
                    {avisos.title}
                    <button onClick={() => onEditar(avisos)}>Editar</button>
                    <button onClick={() => onExcluir(avisos)}>Excluir</button>
                </li>
            ))}
        </ul>
    )
}