import jsTPS_Transaction from "../common/jsTPS.js"

export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, start, end) {
        super();
        this.prevStore = store;
        this.start = start;
        this.end = end;
    }

    doTransaction() {
        this.prevStore.moveSong(this.start, this.end);
    }
    
    undoTransaction(store) {
        store.moveSong(this.end, this.start);
    }
}