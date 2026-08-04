export function generateDeck(n) {
    const cards = [];

    // Première série
    for (let i = 0; i <= n; i++) {
        const card = [1];

        for (let j = 0; j < n; j++) {
            card.push((j + 1) + i * n + 1);
        }

        cards.push(card);
    }

    // Autres cartes
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {

            const card = [i + 2];

            for (let k = 0; k < n; k++) {
                card.push(
                    n + 2 +
                    n * k +
                    ((i * k + j) % n)
                );
            }

            cards.push(card);
        }
    }

    return cards;
}

