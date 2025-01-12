import { PokemonStat } from "./PokemonStat";

export interface Pokemon {
    id: number;
    name: string;
    primaryType: string;
    secondaryType?: string;
    abilities: string[];
    moves: string[];
    imageUrls: string[];
    audio: string;
    stats: PokemonStat[];
}