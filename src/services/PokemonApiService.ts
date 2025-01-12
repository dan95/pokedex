import { Injectable } from "@angular/core";
import { Environment } from "../env";
import { Pokemon } from '../models/Pokemon';
import { StringUtils } from "./StringUtils";
import { PokemonStat } from "../models/PokemonStat";

@Injectable({
    providedIn: 'root'
})
export class PokemonApiService {
    async getPokemonById(pokemonId: number): Promise<Pokemon> {
        const response = await fetch(
            `${Environment.apiUrl}/api/v2/pokemon/${pokemonId}`,
            {
                method: 'GET'
            });

        const pokemonData = await response.json();


        const pokemonTypes = (pokemonData.types || []).map((x: any) => x.type.name);

        return <Pokemon>{
            id: pokemonId,
            name: StringUtils.capitalizeFirstLetter(pokemonData.name),
            abilities: (pokemonData.abilities || []).map((x: any) => StringUtils.capitalizeFirstLetter(x.ability.name)),
            moves: (pokemonData.moves || []).map((x: any) => StringUtils.capitalizeFirstLetter(x.move.name)),
            audio: pokemonData.cries.latest,
            imageUrls: [
                pokemonData.sprites.front_default,
                ...Object.keys(pokemonData.sprites)
                    .filter((key: string) => key !== 'front_default')
                    .map((key: string) => pokemonData.sprites[key])
                    .reduce((list, item) => {
                        StringUtils.getImageUrls(item, list);

                        return list;
                    }, [])
            ],
            primaryType: pokemonTypes.at(0),
            secondaryType: pokemonTypes.at(1),
            stats: pokemonData.stats.map((x: any) => {
                return <PokemonStat>{
                    name: x.stat.name,
                    baseStat: x.base_stat
                };
            })
        };
    }
}