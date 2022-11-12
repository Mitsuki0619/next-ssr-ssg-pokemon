import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  ).then((res) => res.json());
  const paths = data.results.map((poke: any) => `/ssg-pokemons/${poke.name}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params!.pokename}`
  ).then((res) => res.json());

  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params!.pokename}`
  ).then((res) => res.json());

  return { props: { data, species } };
};

const PokemonDetail: NextPage<{ data: any; species: any }> = ({
  data,
  species,
}) => {
  const router = useRouter();
  console.log(data);
  console.log(species);

  const { pokename } = router.query;
  return (
    <div>
      <h1>{pokename} | {species.names[0].name}</h1>
      <div>
        <img src={data.sprites.front_default} alt={data.name} />
      </div>
    </div>
  );
};

export default PokemonDetail;
