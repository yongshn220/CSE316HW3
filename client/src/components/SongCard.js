import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";


    function handleDragStart(event){
        event.dataTransfer.setData("song", event.target.id);
    }
    function handleDragOver(event){
        event.preventDefault();
    }
    function handleDragEnter(event){
        event.preventDefault();
    }
    function handleDragLeave(event){
        event.preventDefault();
    }
    function handleDrop(event){
        event.preventDefault();
        console.log("drop")
        let target = event.target;
        let targetId = target.id;
        if (target.className !== "playlister-song-dragged-to")
        {
            // return;
        }
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        // ASK THE MODEL TO MOVE THE DATA
        store.moveSongTransaction(parseInt(sourceId), parseInt(targetId));
    }

    function handleOnClick(event) {
        console.log("EEE");
        if (event.detail === 2) {
            event.preventDefault();
            store.showEditSong(song);
        }
    }
    function handleOnDeleteClick(event) {
        event.preventDefault();
        console.log("delete Song");
        store.showDeleteSongModal(song._id);
    }
    return (
        <div
            key={index}
            id={'song-' + index}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleOnClick}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleOnDeleteClick}
            />
        </div>
    );
}
export default SongCard;