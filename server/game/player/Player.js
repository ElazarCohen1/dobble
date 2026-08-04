export default class Player {
    constructor(id,name){
        this.id = id;
        this.name = name;
        this.score = 0 ;
    }

    addPoint(nb){
        this.score += nb;
    }
}