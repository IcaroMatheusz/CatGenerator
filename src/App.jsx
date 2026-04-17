import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [loading,setLoading] = useState(true)
  const [imagem,setImagem] = useState('')

  function GerarGato() {
    fetch('https://api.thecatapi.com/v1/images/search')
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setImagem(data[0])
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }


  useEffect(() => { 
    GerarGato() 
  },[])

  return (
    //colocando pro primeiro div da página ter o fundo branco e tbm pra ele ocupar o tamanho inteiro da tela, usando o flexbox pra deixar tudo centralizado bonitao
    <div className='bg-white min-h-screen flex flex-col items-center px-4 py-8'>
      {/* texto principal do projeto go tomando (vai tomando pra quem é leigo)*/}
      <h1 className='text-black text-5xl font-extrabold mt-2 tracking-tight'>
        Cat Generator 
      </h1>
      {/* definindo os limites do card*/}
      <div className='max-w-md w-full rounded-2xl shadow-xl overflow-hidden mt-5'>
          {/* é nesta área que vai ficar a imagem dos gatos uwu :3 nunca mais comento assim kkkkkkkk*/}

          <div className='aspect-video bg-gray-500 flex items-center justify-center'>
              { loading ? (
                <div className='skeleton w-full h-full'></div>
              ) : (
                imagem?.url && ( 
                  <img 
                  src={imagem.url} 
                  alt="just a few cat(s)" />
                )
              )}

          </div>

          {/* legenda pra ficar tipo o bag la do instagram fica show */}
          <div className='p-4 text-center'>
              <p className='text-gray-600 text-sm font-semibold'>
                Clique no botão para gerar um gatinho aleatório
              </p>
          </div>
      </div>

      <button
      className='mt-8 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md transition-colors duration-200 cursor-pointer'
      onClick={GerarGato}
      >
      Gerar novo gato  
      </button>

    </div>
  )
}

export default App
