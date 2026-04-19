// src/hooks/useCatVotes.js
import { useState } from 'react';
import { supabase } from '../services/supabase';

export function useCatVotes() {
  // Estados locais do hook
  const [totalUpvotes, setTotalUpvotes] = useState(0);
  const [totalDownvotes, setTotalDownvotes] = useState(0);
  const [loadingVotes, setLoadingVotes] = useState(false);

  // Função para buscar votos de um gato específico (pelo ID)
  const fetchVotes = async (gatoId) => {
    if (!gatoId) return;
    
    setLoadingVotes(true); // Ativa estado de carregamento
    try {
      // Consulta no Supabase: seleciona tipo_voto onde gato_id é igual ao ID
      const { data, error } = await supabase
        .from('votos_gatos')
        .select('tipo_voto')
        .eq('gato_id', gatoId); // .eq é o filtro (WHERE)

      if (error) throw error;

      // Conta quantos são true (upvote) e false (downvote)
      const upvotes = data.filter(voto => voto.tipo_voto === true).length;
      const downvotes = data.filter(voto => voto.tipo_voto === false).length;
      
      setTotalUpvotes(upvotes);
      setTotalDownvotes(downvotes);
    } catch (error) {
      console.error('Erro ao buscar votos:', error);
    } finally {
      setLoadingVotes(false);
    }
  };

  // Função para registrar um novo voto
  const submitVote = async (gatoId, gatoUrl, tipo) => {
    if (!gatoId) return false;

    try {
      // Insere uma nova linha na tabela votos_gatos
      const { error } = await supabase
        .from('votos_gatos')
        .insert([
          {
            gato_id: gatoId,
            gato_url: gatoUrl,
            tipo_voto: tipo, // true = upvote, false = downvote
          },
        ]);

      if (error) throw error;

      // Atualiza os contadores localmente (otimista)
      if (tipo === true) {
        setTotalUpvotes(prev => prev + 1);
      } else {
        setTotalDownvotes(prev => prev + 1);
      }
      
      return true; // sucesso
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      return false; // falha
    }
  };

  // Retorna tudo o que o componente pode usar
  return {
    totalUpvotes,
    totalDownvotes,
    loadingVotes,
    fetchVotes,
    submitVote,
  };
}