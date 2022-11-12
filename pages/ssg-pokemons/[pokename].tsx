import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";

/**
 * SSGでdynamic routesを使う場合は、GetStaticPathsを使う
 * pathsに生成するページのパス名の配列を代入する
 * → ここではポケモン151匹分の詳細ページを生成させたいため、取得したポケモン151匹の英名を入れる
 * 
 * 返り値にはpaths配列と、fallbackを渡す　 → fallbackをfalseにすると、存在しないパスが開かれたときに404へリダイレクトさせる（trueの挙動はISRにて説明）
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const detail = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  ).then((res) => res.json());
  const paths = detail.results.map((poke: any) => `/ssg-pokemons/${poke.name}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const detail = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params!.pokename}`
  ).then((res) => res.json());

  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params!.pokename}`
  ).then((res) => res.json());

  return { props: { detail, species } };
};

const PokemonDetail: NextPage<{ detail: any; species: any }> = ({
  detail,
  species,
}) => {
  const router = useRouter();

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
