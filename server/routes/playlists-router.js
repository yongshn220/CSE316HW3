/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.post('/playlist/song/:id', PlaylistController.createSong)
router.post('/playlist/move/:id/:start/:end', PlaylistController.moveSong)
router.post('/playlist/song/edit/:id/:song', PlaylistController.editSong)
router.delete('/playlist/:id', PlaylistController.deletePlaylistById)
router.delete('/playlist/song/:id/:sid', PlaylistController.deleteSongById)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)


module.exports = router