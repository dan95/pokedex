import { ResourceNavigationTypeEnum } from "./ResourceNavigationTypeEnum";

export interface PokemonChangeEvent {
    navigationType: ResourceNavigationTypeEnum;
    pokemonId?: number;
}