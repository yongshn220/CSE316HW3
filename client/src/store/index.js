import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_LIST: "DELETE_LIST",
    CREATE_NEW_SONG: "CREATE_NEW_SONG",
    DELETE_SONG: "DELETE_SONG",
    MOVE_SONG: "MOVE_SONG",
    EDIT_SONG: "EDIT_SONG",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        deleteListCounter: 0,
        createSongCounter: 0,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                console.log(store.idNamePairs);
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: false
                });
            }

            case GlobalStoreActionType.DELETE_LIST: {
                console.log("in");
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter + 1,
                    listNameActive: false
                });
            }

            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    createSongCounter: store.createSongCounter,
                    deleteListCounter: store.deleteListCounter,
                    listNameActive: true
                });
            }

            case GlobalStoreActionType.CREATE_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    createSongCounter: store.createSongCounter + 1,
                    listNameAction: false,
                })
            }
            case GlobalStoreActionType.MOVE_SONG: {
                return setStore( {
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    createSongCounter: store.createSongCounter + 1,
                    listNameAction: false,
                })
            }
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore( {
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    deleteListCounter: store.deleteListCounter,
                    createSongCounter: store.createSongCounter + 1,
                    listNameAction: false,
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            console.log("ac");
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.updateCurrentList = function () {
        store.setCurrentList(store.currentList._id);
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.createSong = function () {
        async function asyncCreateSong() {
            let response = await api.createSong(store.currentList._id);
            if (response.data.success) {
                storeReducer({
                    type:GlobalStoreActionType.CREATE_NEW_SONG,
                    payload: null
                });
                store.history.push();
            }
        }
        asyncCreateSong();
    }

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
        
    store.createNewPlaylist = function () {
        async function asyncCreateNewPlayList() {
            let newList = {"name": "Untitled", "songs": []};
            let response = await api.createNewList(newList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: response.data.playlist,
                });
                store.history.push("/playlist/" + response.data.playlist._id);
            }
        }
        asyncCreateNewPlayList();
    }

    store.deletePlaylistById = function (id) {
        async function asyncRemovePlaylist() {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                console.log("succcc");
                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST,
                    payload: null,
                });
            }
        }
        asyncRemovePlaylist(id);
    }

    store.showDeleteListModal = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: null,
        });
        let modal = document.getElementById("delete-list-modal");
        modal.setAttribute("value", id);
        modal.classList.add("is-visible");
    }

    store.hideDeleteListModal = function () {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    store.moveSong = function (start, end) {
        async function asyncMoveSong() {
            let response = await api.moveSong(store.currentList._id, start, end);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.MOVE_SONG,
                    payload: null,
                });
            }
        }
        asyncMoveSong(); 
    }

    store.showEditSong = function (song) {

        document.getElementById("edit-input-title").value = song.title;
        document.getElementById("edit-input-artist").value = song.artist;
        document.getElementById("edit-input-youtubeId").value = song.youTubeId;
        let modal = document.getElementById("edit-songinfo");
        console.log(song);
        modal.setAttribute("value", JSON.stringify(song));
        modal.classList.add("is-visible");
    }

    store.hideEditSongModal = function () {
        let modal = document.getElementById("edit-songinfo");
        modal.classList.remove("is-visible");
    }

    store.editSong = function (song) {
        async function asyncEditSong()
        {  
            console.log(song);
            let response = await api.editSong(store.currentList._id, song)
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.EDIT_SONG,
                    playload: null,
                });
            }
        }    
        asyncEditSong();    
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}