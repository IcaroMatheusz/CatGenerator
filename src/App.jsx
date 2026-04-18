import { useEffect, useState } from "react";
import Header from "./components/Header";
import CatCard from "./components/CatCard";
import VoteButtons from "./components/VoteButtons";
import FeedbackMessage from "./components/FeedbackMessage";

import "./App.css";

function App() {

  const [loading, setLoading] = useState(true);
  const [imagem, setImagem] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentVote, setCurrentVote] = useState(null);
  const [feedback, setFeedback] = useState(null)
  const [totalUpvotes, setTotalUpVotes] = useState(0)
  const [totalDownvotes, setTotalDownVotes] = useState(0)


  function GerarGato() {

    setLoading(true);
    setImgLoaded(false);
    setCurrentVote(null)

    fetch("https://api.thecatapi.com/v1/images/search")
      .then((resp) => resp.json())
      .then((data) => {

        setImagem(data[0]);

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

  function handleUpVote() {
    setCurrentVote(true)
    setTotalUpVotes(prev => prev + 1);
    setFeedback({
      type: "success",
      text: "Upvote registrado!"
    })
    setTimeout(() => setFeedback(null), 6000)
  }

  function handleDownVote() {
    setCurrentVote(false)
    setTotalDownVotes(prev => prev + 1);
    setFeedback({
      type: "success",
      text: "Downvote registrado!"
    })
    setTimeout(() => setFeedback(null), 6000)
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
