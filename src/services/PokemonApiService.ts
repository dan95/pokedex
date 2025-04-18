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
    private async getApiData(
        uri: string
    ): Promise<string> {
        const response = await fetch(uri, { method: 'GET' });

        const responseText = await response.text();

        return responseText;
    }

    async getPokemonDescription(pokemonId: number): Promise<string[]> {
        const response = await this.getApiData(
            `${Environment.apiUrl}/api/v2/pokemon-species/${pokemonId}`
        );

        const result = JSON.parse(response);

        const descriptionList = result['flavor_text_entries']
            .filter((x: any) => x?.language?.name === 'en')
            .map((x: any) => x['flavor_text'].replaceAll('\n', ' '));

        return descriptionList
    }

    async getPokemonById(pokemonId: number): Promise<Pokemon> {
        const uri = `${Environment.apiUrl}/api/v2/pokemon/${pokemonId}`;

        let _storage;
        if (typeof localStorage !== 'undefined') {
            _storage = localStorage; 
        }

        const cachedPokemon = _storage?.getItem(uri);

        if(cachedPokemon) {
            return <Pokemon>JSON.parse(cachedPokemon);
        }

        const response = await this.getApiData(uri);

        const pokemonData = JSON.parse(response);

        const pokemonTypes = (pokemonData.types || []).map((x: any) => x.type.name);

        const pokemon = <Pokemon>{
            id: pokemonId,
            name: StringUtils.capitalizeFirstLetter(pokemonData.name),
            abilities: (pokemonData.abilities || []).map((x: any) =>
                x.ability.name.split('-').map((stringPart: string) => StringUtils.capitalizeFirstLetter(stringPart)).join(' ')),
            moves: (pokemonData.moves || []).map((x: any) =>
                x.move.name.split('-').map((stringPart: string) => StringUtils.capitalizeFirstLetter(stringPart)).join(' ')),
            cry: pokemonData.cries.latest,
            imageUrls: [
                (pokemonData.sprites?.other || {})['dream_world']?.front_default
                || (pokemonData.sprites?.other || {})['official-artwork']?.front_default
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
            }),
            descriptionList: await this.getPokemonDescription(pokemonId)
        };

        _storage?.setItem(uri, JSON.stringify(pokemon));

        return pokemon;
    }
}