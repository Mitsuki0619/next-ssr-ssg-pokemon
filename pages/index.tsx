import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  const links = ["ssg-pokemons", "ssr-pokemons"];

  return (
    <div>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link href={`/${link}`}>{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
