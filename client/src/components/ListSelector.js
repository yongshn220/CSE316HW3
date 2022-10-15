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
        console.log("test");
        store.loadIdNamePairs();
    }, [store.deleteListCounter]);

    
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

    console.log("listselecte");
    console.log(listCard);
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
                <div id="playlist-selector-heading">
                    <input
                        type="button"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                        className="playlister-button"
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