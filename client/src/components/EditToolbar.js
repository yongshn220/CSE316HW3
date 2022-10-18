import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleAdd() {
        store.createSongTransaction();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.clearTransaction();
        store.closeCurrentList();
    }

    let addDisable = false;
    let undoDisable = false;
    let redoDisable = false;
    let closeDisable = false;
    if (store.listNameActive || store.currentList == null) {
        addDisable = true;
        undoDisable = true;
        redoDisable = true;
        closeDisable = true;
    }
    console.log("EDittoolbar");
    if (!store.hasTransactionToUndo()) { undoDisable = true; }
    if (!store.hasTransactionToRedo()) { redoDisable = true; }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={addDisable}
                value="+"
                className={enabledButtonClass}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={undoDisable}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={redoDisable}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={closeDisable}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;