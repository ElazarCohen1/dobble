import { cardsItems } from "./cardsItems";

export function cardToSymbols(card) {
    return card.map(id => cardsItems[id - 1]);
}