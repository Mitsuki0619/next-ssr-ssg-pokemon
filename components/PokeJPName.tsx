import React from "react";
import useSWR from "swr";

const fetchJpName = async (name: string) => {
  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  ).then((res) => res.json());
  return species;
};

/**
 * ポケモンの日本名を取得し、返す
 */
export const PokeJPName: React.FC<{ name: string }> = ({ name }) => {
  const { data } = useSWR(`${name}`, fetchJpName, { suspense: true });
  return <>{data.names[0].name}</>;
};
