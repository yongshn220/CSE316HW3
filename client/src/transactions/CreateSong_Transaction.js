import jsTPS_Transaction from "../common/jsTPS.js"
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

export default class CreateSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.prevStore = store
    }

    doTransaction(store) {
        this.prevStore.createSong();
    }
    
    undoTransaction(store) {
        store.deleteLastSong();
    }
}