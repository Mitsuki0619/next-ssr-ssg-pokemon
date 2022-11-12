import React from "react";
import useSWR from "swr";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
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
        <li key={elem.name}>
          <Link href={`/ssg-pokemons/${elem.name}`}>{elem.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Index;
