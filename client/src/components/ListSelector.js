import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteListModal from './DeleteListModal.js'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
        console.log("cheeck");
    }, [store.deleteListCounter, store.listNameActive]);

    console.log("list selection");

    function handleCreateNewList() {
        store.createNewPlaylist();
    }
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }

    let addDisable = false;
    console.log(store.tempListNameActive);
    let className = "playlister-button";
    if (store.tempListNameActive) { 
        addDisable = true; 
        className = "playlister-button-disabled";
    }

    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
                <div id="playlist-selector-heading">
                    <input
                        type="button"
                        id="add-list-button"
                        className={className}
                        disabled={addDisable}
                        onClick={handleCreateNewList}
                        
                        value="+" />
                        
                    Your Lists
                </div>
                {listCard}
            </div>
            <DeleteListModal>
            </DeleteListModal>
        </div>
    )
}

export default ListSelector;