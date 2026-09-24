/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'

import NovoAviso from './NovoAviso'
import ListaAvisos from './assets/ListaAvisos'

function App() {

  const [aviso, setAviso] = useState([])
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [excluindo, setExcluindo] = useState(null) 

  useEffect(() => {
    const controle = new AbortController()
    const signal = controle.signal

    async function buscarAviso() {
      try {  
       setCarregando(true)
       SpeechRecognitionErrorEvent(null)
       const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
       if (!resp.ok) {
         throw new Error(`HTTP ${resp.status}`)
       }
         const data = await resp.json()
         setAviso(data)
      } catch (erro) {
        if (erro.name !== 'AbortError') {
          setErro(erro.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscarAviso()

    return () => controle.abort()
  }, [])

  async function excluirAviso(id) {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`)
    }
    return true
  }

  async function tentarExcluir(id) {
    const prev = aviso
    setAviso(prev.filter(aviso => aviso.id !== id))
    try {
      await excluirAviso(id)
    } catch (erro) {
      setAviso(prev)
      setErro(erro.message)
    }
  }

  return (
    <>
    <div>
      <h1>Mural de Avisos</h1>
    </div>
    <div>
      <NovoAviso/>
    </div>
    </>
  )
}

export default App
