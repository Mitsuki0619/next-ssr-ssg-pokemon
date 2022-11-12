import { useRouter } from "next/router";
import React from "react";



const PokemonDetail = () => {
  const router = useRouter();

  const { pokeId } = router.query;
  return <div>{pokeId}</div>;
};

export default PokemonDetail;
