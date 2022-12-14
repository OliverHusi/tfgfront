import {createSlice} from '@reduxjs/toolkit';

export const videosSlice = createSlice({
    name: 'videos',
    initialState: {
        isLoadingVideos: true,
        videoSubir: '',
        videos: [],
        videoSeleccionado: undefined,
        comentarios: [],
        videosUsuario: []
    },
    reducers: {
        onAddNewVideo: (state, {payload}) => {
            state.videoSubir = payload;
        },
        clearVideoSubir: (state) => {
            state.videoSubir = '';
        },
        setVideos: (state, {payload}) => {
            state.videos = payload;
        },
        seleccionarVideo: (state, {payload}) => {
            state.videoSeleccionado = payload;
        },
        seleccionarVideoComentarios: (state, {payload}) => {
            state.comentarios = payload;
        },
        setVideosUsuario: (state, {payload}) => {
            state.videosUsuario = payload;
        }
    }
});

export const {onAddNewVideo, clearVideoSubir, setVideos, seleccionarVideo, seleccionarVideoComentarios, setVideosUsuario} = videosSlice.actions;