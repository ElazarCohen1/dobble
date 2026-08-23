export default class Game{


    constructor(deck,gameId){
        this.id = gameId;
        this.deck = deck; // list of list
        this.players = [] // array of Player 
        this.currentRound = 0;
        this.score = {}; // map playerId => score
        this.started = false;
        this.centerCard = null;
        this.playerCards = new Map();
    }

    addPlayer(player){
        this.players.push(player);
    }
    

    start(){
        this.started = true;
        
        this.centerCard = this.deck.pop();


        for (const player of this.players) {
            const card = this.deck.pop();

            this.playerCards.set(player.id, card);
        }
    }

    // array of id
    checkSamecard(playerId,clickId){ 
        const playerCard = this.playerCards.get(playerId);

        if(!playerCard || !this.centerCard) return false;

        return (
            playerCard.includes(clickId) &&
            this.centerCard.includes(clickId)
        );
    }
    
    nextRound(playerId) {
        this.currentRound++;

        // le joueur récupère la carte centrale
        this.playerCards.set(playerId, this.centerCard);
        this.score[playerId] = (this.score[playerId] || 0) +1 ;
        // nouvelle carte centrale
        if (this.deck.length > 0) {
            this.centerCard = this.deck.pop();
            return false;
        }
        // plus de cartes
        this.centerCard = null;
        return true;
    }

    delete(){
        this.deck = null;
        this.players = [] // array of Player 
        this.currentRound = 0;
        this.score = {};
        this.started = false;
        this.centerCard = null;
        this.playerCards = new Map();
    }
}