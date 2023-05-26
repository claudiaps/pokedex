import { SimpleGrid, Spinner } from "@chakra-ui/react";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import './Home.css'
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);

    const getPokemon = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
            const promiseArray = data.results.map(pokemon => {
                return axios.get(pokemon.url)
            })
            const promiseResult = await Promise.all(promiseArray)
            const pokemonData = promiseResult.map(result => result.data)
            setPokemons(pokemonData)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getPokemon()
    }, [])

    const renderPokemonList = () => {
        if(loading || !pokemons.length) {
            return (
                <Spinner />
            )
        }

        return (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {
                    pokemons.map(pokemon =>  (
                        <PokemonCard name={pokemon.name} image={pokemon.sprites.other['official-artwork'].front_default}/>
                    ))
                }
            </SimpleGrid>
        )
    }

    return (
        <div className="container">
            <Header />
            {renderPokemonList()}
        </div>
    );
}

export default Home;
