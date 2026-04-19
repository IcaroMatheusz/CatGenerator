import { useEffect, useState } from "react";
import Header from "./components/Header";
import CatCard from "./components/CatCard";
import VoteButtons from "./components/VoteButtons";
import FeedbackMessage from "./components/FeedbackMessage";
import { useCatVotes } from "./hooks/useCatVotes.js";

import "./App.css";

function App() {

  const [loading, setLoading] = useState(true);
  const [imagem, setImagem] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentVote, setCurrentVote] = useState(null);
  const [feedback, setFeedback] = useState(null)

  //usando o hook de votos
  const { totalUpvotes, totalDownvotes, fetchVotes, submitVote } = useCatVotes();

  function GerarGato() {

    setLoading(true);
    setImgLoaded(false);
    setCurrentVote(null) //resetando o voto atual

    fetch("https://api.thecatapi.com/v1/images/search")
      .then((resp) => resp.json())
      .then( async (data) => {
        const novoGato = data[0];
        setImagem(novoGato);


        //buscando os votos da imagem no Supabase
        if (novoGato?.id) {
          await fetchVotes(novoGato.id)
        } 
      })
      .catch((error) => {
        console.log("Erro ao buscar o gato:", error);
        setFeedback({
          type: "error",
          text: "Erro ao carregar o gatinho"
        })
        setTimeout(() => setFeedback(null), 3000)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //ao clicar em upvote, essa função é chamada
  async function handleUpVote() {
    if (!imagem?.id) {
      setFeedback({ type: "error", text: "Nenhum gato para votar!"});
      setTimeout(() => setFeedback(null), 3000)
      return;
    }


    setCurrentVote(true);

    //salvando o voto no supabase

    const success = await submitVote(imagem.id,imagem.url,true); 


    if (success) {
      setFeedback({ type: "success", text: "Upvote registrado!"})
    } else {
      setFeedback({ type: "error", text: "Ocorreu um erro ao registrar o voto"})
    }
    setTimeout(() => setFeedback(null), 3000)
  }

  async function handleDownVote() {
    if (!imagem?.id) {
      setFeedback({ type: "error", text: "Nenhum gato para votar!"});
      setTimeout(() => setFeedback(null), 3000)
      return;
    }


    setCurrentVote(false);

    //salvando o voto no supabase
    const success = await submitVote(imagem.id,imagem.url, false); //colocando a imagemid, a url da imagem, e o boolean false nas tabelas


    if (success) {
      setFeedback({ type: "success", text: "Downvote registrado!"})
    } else {
      setFeedback({ type: "error", text: "Ocorreu um erro ao registrar o voto"})
    }
    setTimeout(() => setFeedback(null), 3000)
  }

  useEffect(() => {
    GerarGato();
    
  }, []);


  return (

    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-4 py-8">
        <FeedbackMessage 
        feedback={feedback} 
        onClose={() => setFeedback(null)} 
        />

        <Header />

        <CatCard 
        imagem={imagem}
        loading={loading}
        imgLoaded={imgLoaded}
        onLoad={() => setImgLoaded(true)}
        totalUpvotes={totalUpvotes}
        totalDownvotes={totalDownvotes}
        />
        

        <VoteButtons
        onUpvote={handleUpVote}
        onDownvote={handleDownVote}
        currentVote={currentVote}
        />

        <button
        className="mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md transition-colors duration-200 cursor-pointer"
        onClick={GerarGato}
        >
        Gerar novo gato
        </button>
    </div>
  );
}

export default App;
