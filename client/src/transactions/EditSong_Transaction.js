import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, id, prevSong, newSong) {
        super();
        this.app = initApp;
        this.id = id;
        this.prevSong = prevSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.app.editSongInfo(this.id, this.newSong);
    }
    
    undoTransaction() {
        this.app.editSongInfo(this.id, this.prevSong);
    }
}