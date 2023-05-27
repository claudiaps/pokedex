import { useCallback, useEffect, useState } from "react";

import { SimpleGrid, Spinner, Flex, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";

import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import './Home.css'

const Pagination = ({request, offset}) => {

    const nextPage = () => {
        request(offset + 20)
    }

    const previousPage = () => {
        if (offset === 0) return
        request(offset - 20)
    }

    return (
        <Flex gap={4}>
            <IconButton onClick={previousPage} icon={<ArrowLeftIcon/>}/>
            <IconButton onClick={nextPage} icon={<ArrowRightIcon/>}/>
        </Flex>
    )
}

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);

    const getPokemon = useCallback(async (paramOffset) => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
                    params: {
                    limit: 20,
                    offset: paramOffset
                }
            });
            const promiseArray = data.results.map(pokemon => {
                return axios.get(pokemon.url)
            })
            const promiseResult = await Promise.all(promiseArray)
            const pokemonData = promiseResult.map(result => result.data)
            setPokemons(pokemonData)
            setOffset(paramOffset)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getPokemon(0)
    }, [])

    const renderPokemonList = () => {
        if(loading || !pokemons.length) {
            return (
                <Spinner />
            )
        }

        return (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' padding={4}>
                {
                    pokemons.map(pokemon =>  {
                        return (
                            <PokemonCard pokemon={pokemon}/>
                        )
                    })
                }
                <Pagination offset={offset} request={getPokemon}/>
            </SimpleGrid>
        )
    }
 
    return (
        <div className="container">
            <Header title="Pokedex"/>
            {renderPokemonList()}
        </div>
    );
}

export default Home;
