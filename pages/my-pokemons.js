import React from "react";
import Header from "../layouts/Head";
import MyPokemonsModule from "../components/MyPokemons/MyPokemonsModule";

function PokemonDetailPage() {
  return (
    <div>
      <Header title="My Pokemons" description="Here are pokemons you've catch 'em" />
      <MyPokemonsModule/>
    </div>
  );
}

export default PokemonDetailPage;
