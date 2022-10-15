import React, { Component } from 'react';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store';

function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);
    function handleClickCancel() {
        store.hideDeleteListModal();
    }

    function handleClickConfirm(event) {
        store.deletePlaylistById(document.getElementById("delete-list-modal").getAttribute("value"));
        store.hideDeleteListModal();
    }
    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft"
            value="">
            <div className="modal-dialog" id='verify-delete-list-root'>
                <div className="modal-header">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the {} playlist?
                    </div>
                </div>
                <div id="confirm-cancel-container" className="modal-footer">
                    <input type="button" 
                        id="delete-list-confirm-button" 
                        className="modal-button" 
                        onClick={handleClickConfirm}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-list-cancel-button" 
                        className="modal-button" 
                        onClick={handleClickCancel}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal;