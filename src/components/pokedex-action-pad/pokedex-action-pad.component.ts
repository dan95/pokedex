import { Component, Input } from "@angular/core";
import { PokemonEventService } from "../../services/PokemonEventService";
import { ResourceNavigationTypeEnum } from "../../models/ResourceNavigationTypeEnum";
import { PokemonChangeEvent } from "../../models/PokemonChangeEvent";

@Component({
    selector: 'pokedex-action-pad',
    templateUrl: './pokedex-action-pad.component.html',
    styleUrl: './pokedex-action-pad.component.css'
})
export class PokedexActionPadComponent {
    constructor(private pokemonEventService: PokemonEventService) {
    }

    nextImage() {
        this.pokemonEventService.changeImageEvent.next(
            ResourceNavigationTypeEnum.NEXT
        );
    }

    previousImage() {
        this.pokemonEventService.changeImageEvent.next(
            ResourceNavigationTypeEnum.PREVIOUS
        );
    }

    resetImage() {
        this.pokemonEventService.changeImageEvent.next(
            ResourceNavigationTypeEnum.RESET
        );
    }

    nextPokemon() {
        this.pokemonEventService.changePokemonEvent.next(
            <PokemonChangeEvent>{
                navigationType: ResourceNavigationTypeEnum.NEXT
            }
        );
    }

    previousPokemon() {
        this.pokemonEventService.changePokemonEvent.next(
            <PokemonChangeEvent>{
                navigationType: ResourceNavigationTypeEnum.PREVIOUS
            }
        );
    }

    resetPokemon() {
        this.pokemonEventService.changePokemonEvent.next(
            <PokemonChangeEvent>{
                navigationType: ResourceNavigationTypeEnum.RESET
            }
        );
    }
}