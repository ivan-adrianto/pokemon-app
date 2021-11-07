import React from "react";
import MyPokemonDetailModule from "../../components/MyPokemonDetail/MyPokemonDetailModule";
import Header from "../../layouts/Head";

function PokemonDetailPage() {
  return (
    <div>
      <Header title="My Pokemon Detail" description="My Pokemon Detail" />
      <MyPokemonDetailModule />
    </div>
  );
}

export default PokemonDetailPage;
