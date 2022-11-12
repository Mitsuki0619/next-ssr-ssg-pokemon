import React, { Suspense } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { PokeJPName } from "../../components/PokeJPName";

/**
 * SSGを行う場合は、GetStaticPropsを使う。
 * ここでreturnされるpropsの中に取得したデータを入れる。
 * → getStaticPropsでreturnされたpropsを実際のコンポーネントのpropsに渡すことで、取得したデータをコンポーネントの中で使える
 */
export const getStaticProps: GetStaticProps = async () => {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  ).then((res) => res.json());
  return {
    props: {
      pokemons, // pokemonsのデータをpropsに入れる
    },
  };
};

const Index: NextPage<{ pokemons: any }> = ({
  pokemons /** getStaticPropsでreturnしたprops（同名） */,
}) => {
  return (
    <ul>
      {pokemons.results.map((elem: any) => (
        <li key={elem.name}>
          <Link href={`/ssg-pokemons/${elem.name}`}>
            {elem.name} |{" "}
            <Suspense fallback={"読み込み中"}>
              <PokeJPName name={elem.name} />
            </Suspense>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Index;
