import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ResourceNavigationTypeEnum } from "../models/ResourceNavigationTypeEnum";
import { PokemonChangeEvent } from "../models/PokemonChangeEvent";

@Injectable({
    providedIn: 'root',
    useValue: new PokemonEventService()
})
export class PokemonEventService {
    public changeImageEvent: Subject<ResourceNavigationTypeEnum> = new Subject<ResourceNavigationTypeEnum>();
    public changePokemonEvent: Subject<PokemonChangeEvent> = new Subject<PokemonChangeEvent>();
}