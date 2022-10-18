import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, oldSong, newSong) {
        super();
        this.prevStore = store;
        this.oldSong = oldSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.prevStore.editSong(this.newSong);
    }
    
    undoTransaction(store) {
        store.editSong(this.oldSong);
    }
}