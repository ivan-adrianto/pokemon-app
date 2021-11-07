import React from "react";
import PokemonDetailModule from "../../components/PokemonDetail/PokemonDetailModule";
import Header from "../../layouts/Head";

function PokemonDetailPage() {
  return (
    <div>
      <Header title="Pokemon Detail" description="Pokemon Detail" />
      <PokemonDetailModule />
    </div>
  );
}

export default PokemonDetailPage;
