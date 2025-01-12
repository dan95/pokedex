import { Injectable } from "@angular/core";
import { Environment } from "../env";
import { Pokemon } from '../models/Pokemon';
import { StringUtils } from "./StringUtils";
import { PokemonStat } from "../models/PokemonStat";
import { Utils } from "./Utils";

@Injectable({
    providedIn: 'root'
})
export class PokemonApiService {
    async getPokemonDescription(pokemonId: number): Promise<string> {
        const response = await fetch(
            `${Environment.apiUrl}/api/v2/pokemon-species/${pokemonId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        const descriptionList = result['flavor_text_entries'].filter((x: any) => x?.language?.name === 'en');

        const description = descriptionList[Utils.randomIntFromInterval(0, descriptionList.length-1)];

        const sanitizedDescription = description['flavor_text'].replaceAll('\n', ' ');

        return sanitizedDescription;
    }
    
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
            abilities: (pokemonData.abilities || []).map((x: any) =>
                x.ability.name.split('-').map((stringPart: string) => StringUtils.capitalizeFirstLetter(stringPart)).join(' ')),
            moves: (pokemonData.moves || []).map((x: any) =>
                x.move.name.split('-').map((stringPart: string) => StringUtils.capitalizeFirstLetter(stringPart)).join(' ')),
            cry: pokemonData.cries.latest,
            imageUrls: [
                (pokemonData.sprites?.other || {})['official-artwork']?.front_default
                || (pokemonData.sprites?.other || {})['dream_world']?.front_default
                || pokemonData.sprites?.front_default,
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
                    name: x.stat.name.toUpperCase(),
                    baseStat: x.base_stat
                };
            })
        };
    }
}