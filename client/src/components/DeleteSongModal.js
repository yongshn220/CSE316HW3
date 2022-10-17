import React, { Component, useContext } from 'react';
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const { store }  = useContext(GlobalStoreContext);

    function handleOnClickConfirm(event)
    {
        store.deleteSong();
        store.hideDeleteSongModal();
    }

    function handleOnClickCancel(event)
    {
        event.preventDefault();
        store.hideDeleteSongModal();
    }

    return (
        <div className="modal" id="delete-song-modal" defaultValue="" data-animation="slideInOutLeft">
            <div className="modal-dialog" id='verify-delete-song-root'>
                <div className="modal-north">
                    Delete Song?
                </div>                
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently remove <span id="delete-song-span"></span> from the playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="delete-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        onClick={handleOnClickConfirm}
                    />
                    <input 
                        type="button" 
                        id="delete-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel'
                        onClick={handleOnClickCancel}
                    />
                </div>
            </div>
        </div>
    );
}

export default DeleteSongModal;