export default class Game{


    constructor(deck,gameId){
        this.id = gameId;
        this.deck = deck; // list of list
        this.players = [] // array of Player 
        this.currentRound = 0;
        this.score = {};
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

    
    nextRound(){
        this.currentRound++;
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