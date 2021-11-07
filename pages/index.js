import Head from "../layouts/Head";
import PokemonListModule from "../components/PokemonList/PokemonListModule";

export const config = { amp: "hybrid" };

export default function Home() {

  return (
    <div>
      <Head
        title="Poke App Home"
        description="Click one of the pokemon to catch 'em!"
      />
      <PokemonListModule />
    </div>
  );
}
