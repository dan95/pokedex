import { CommonModule } from "@angular/common";
import { Component, Input, input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Pokemon } from "../../models/Pokemon";
import { PokemonEventService } from "../../services/PokemonEventService";
import { Subscription } from "rxjs";
import { ResourceNavigationTypeEnum } from "../../models/ResourceNavigationTypeEnum";

@Component({
    selector: 'pokedex-portrait',
    templateUrl: './pokedex-portrait.component.html',
    styleUrl: './pokedex-portrait.component.css',
    imports: [CommonModule]
})
export class PokedexPortraitComponent implements OnInit, OnDestroy, OnChanges {
    @Input('pokemon')
    public pokemon: Pokemon = <Pokemon>{};
    public imageIndex: number = 0;

    private showImageSubscription?: Subscription;

    constructor(private pokemonEventService: PokemonEventService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const previousPokemonValue = changes['pokemon'].previousValue;
        if (!previousPokemonValue) {
            return;
        }

        this.imageIndex = 0;
    }
    ngOnDestroy(): void {
        this.showImageSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.showImageSubscription = this.pokemonEventService.changeImageEvent
            .subscribe((navigationType: ResourceNavigationTypeEnum) => this.handleImageNavigation(navigationType));
    }

    handleImageNavigation(navigationType: ResourceNavigationTypeEnum) {
        switch (navigationType) {
            case ResourceNavigationTypeEnum.PREVIOUS: {
                if (this.imageIndex === 0) {
                    return;
                }

                this.imageIndex--;
                break;
            }
            case ResourceNavigationTypeEnum.NEXT: {
                if (this.imageIndex === this.pokemon.imageUrls.length - 1) {
                    return;
                }

                this.imageIndex++;

                break;
            }
            case ResourceNavigationTypeEnum.RESET: {
                this.imageIndex = 0;
                break;
            }
        }
    }
}