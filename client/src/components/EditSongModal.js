import React, { Component } from 'react';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store';

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    function handleOnClickConfirm(event) {
        let song = JSON.parse(document.getElementById("edit-songinfo").getAttribute("value"));
        let oldSong = JSON.stringify(song);
        song.title = document.getElementById("edit-input-title").value;
        song.artist = document.getElementById("edit-input-artist").value;
        song.youTubeId = document.getElementById("edit-input-youtubeId").value;

        store.editSongTransaction(oldSong, JSON.stringify(song));
        store.hideEditSongModal();
    }

    function handleOnClickCancel(event) {
        event.preventDefault();
        store.hideEditSongModal();
    }

    // onBlur() check in render() : onBlur (called after focus removed from the target)
    return (
        <div className="songinfo" id="edit-songinfo" defaultValue="">
            <div className="songinfo-root" id='verify-delete-songinfo-root'>
                <div className="songinfo-north">
                    Edit songinfo
                </div>                
                <div className="songinfo-center">
                    <div className="songinfo-center-content">
                        <div className="songinfo-content-key">Title</div>
                        <input id="edit-input-title" className="songinfo-content-input" defaultValue="this is title"></input>
                    </div>
                    <div className="songinfo-center-content">
                        <div className="songinfo-content-key">Artist</div>
                        <input id="edit-input-artist" className="songinfo-content-input" defaultValue="this is title"></input>
                    </div>
                    <div className="songinfo-center-content">
                        <div className="songinfo-content-key" >Youtube ID</div>
                        <input id="edit-input-youtubeId" className="songinfo-content-input" defaultValue="this is title"></input>
                    </div>
                </div>
                <div className="songinfo-south">
                    <input type="button" id="edit-songinfo-confirm-button" className="songinfo-button" defaultValue='Confirm' onClick={handleOnClickConfirm}/>
                    <input type="button" id="edit-songinfo-cancel-button" className="songinfo-button" defaultValue='Cancel' onClick={handleOnClickCancel}/>
                </div>
            </div>
        </div>
    );
}

export default EditSongModal;