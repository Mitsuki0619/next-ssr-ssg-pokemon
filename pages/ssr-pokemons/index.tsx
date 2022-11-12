import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  ).then((res) => res.json());

  return {
    props: { pokemons },
  };
};

const Index: NextPage<{ pokemons: any }> = ({ pokemons }) => {
  return (
    <ul>
      {pokemons.results.map((elem: any) => (
        <li key={elem.name}>
          <Link href={`/ssr-pokemons/${elem.name}`}>{elem.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Index;
