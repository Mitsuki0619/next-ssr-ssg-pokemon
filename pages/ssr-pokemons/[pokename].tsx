import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const detail = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params!.pokename}`
  ).then((res) => res.json());

  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params!.pokename}`
  ).then((res) => res.json());

  return {
    props: { detail, species },
  };
};

const PokemonDetail: NextPage<{ detail: any; species: any }> = ({
  detail,
  species,
}) => {
  const router = useRouter();
  console.log(detail);
  console.log(species);

  const { pokename } = router.query;
  return (
    <div>
      <h1>
        {pokename} | {species.names[0].name}
      </h1>
      <div>
        <img src={detail.sprites.front_default} alt={detail.name} />
      </div>
    </div>
  );
};

export default PokemonDetail;
