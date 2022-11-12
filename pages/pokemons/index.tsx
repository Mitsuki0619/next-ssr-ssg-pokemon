import React from "react";
import useSWR from "swr";
import { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  ).then((res) => res.json());
  return {
    props: {
      pokemons: data,
    },
  };
};

const Index: NextPage<{ pokemons: any }> = ({ pokemons }) => {
  console.log(pokemons);

  return (
    <ul>
      {pokemons.results.map((elem: any) => (
        <li key={elem.name}>{elem.name}</li>
      ))}
    </ul>
  );
};

export default Index;
