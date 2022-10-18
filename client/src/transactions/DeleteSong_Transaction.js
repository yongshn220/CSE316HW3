import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store, index, song) {
        super();
        this.prevStore = store;
        this.index = index;
        this.song = song;
    }

    doTransaction() {
        this.prevStore.deleteSong(this.song._id);
    }
    
    undoTransaction(recentStore) {
        recentStore.createSongInIndex(this.index, this.song);
    }
}