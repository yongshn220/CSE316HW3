const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/


deleteSongById = async (req, res) => {
    await Playlist.findOne({_id: req.params.id}, (err, _playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }

        _playlist.songs = _playlist.songs.filter(song => song._id != req.params.sid);

        _playlist.save().then(() => {
            return res.status(201).json({
                success: true,
                playlist:_playlist,
                message:"",
            })
        })
    }).catch(err => console.log(err))
}

deletePlaylistById = (req, res) => {
    Playlist.deleteOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }

        return res.status(200).json({ success: true, playlist: null})
    }).catch(err => console.log(err))
}

createSong = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, _playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        _playlist.songs.push({title: "Untitle", artist: "Unknown", youTubeId:""});
        console.log(_playlist);

        _playlist.save().then(() => {
            return res.status(201).json({
                success: true,
                playlist: _playlist,
                message: "",
            })
        })
        .catch (error => {
            return res.status(400).json({
                error,
                message: "",
            })
        })
    }).catch(err => console.log(err))
}

moveSong = async (req, res) => {
    await Playlist.findOne({_id: req.params.id}, (err, _playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        moveSongInPlaylist(_playlist, parseInt(req.params.start), parseInt(req.params.end));
        console.log(_playlist);
        _playlist.save().then(() => {
            return res.status(201).json({
                success: true,
                playlist: _playlist,
                message: "",
            })
        })
        .catch (error => {
            return res.status(400).json({
                error,
                message: "",
            })
        })
    }).catch(err => console.log(err))
}

moveSongInPlaylist = (list, start, end) => {
    // WE NEED TO UPDATE THE STATE FOR THE APP
    let temp;
    if (start < end) {
        temp = copySong(list.songs[start]);
        for (let i = start; i < end; i++) {
            copySongData(list.songs[i], list.songs[i+1]);
        }
    }
    else if (start > end) {
        temp = copySong(list.songs[start]);
        for (let i = start; i > end; i--) {
            copySongData(list.songs[i], list.songs[i-1]);
        }
    }
    copySongData(list.songs[end], temp);
    return list;
}

copySong = (song) => {
    return {_id: song._id, title: song.title, artist: song.artist, youTubeId: song.youTubeId};
}

copySongData = (song1, song2) => {
    song1._id = song2._id;
    song1.title = song2.title;
    song1.artist = song2.artist; 
    song1.youTubeId = song2.youTubeId; 
}

editSong = async (req, res) => {
    let song = JSON.parse(req.params.song);
    
    await Playlist.findOne({_id: req.params.id}, (err, _playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        console.log(_playlist.songs);
        _playlist.songs.map((s) => {
            console.log(s._id);
            console.log(song._id);
            if (s._id == song._id)
            {
                s.title = song.title;
                s.artist = song.artist;
                s.youTubeId = song.youTubeId;
            }
        })

        _playlist.save().then(() => {
            return res.status(201).json({
                success: true,
                playlist: _playlist,
                message: "",
            })
        })
        .catch (error => {
            return res.status(400).json({
                error,
                message: "",
            })
        })
    }).catch(err => console.log(err))
}
createPlaylist = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    const playlist = new Playlist(body);
    
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }
    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}

getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    createSong,
    moveSong,
    editSong,
    deletePlaylistById,
    deleteSongById,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById
}