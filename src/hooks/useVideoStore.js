import { useDispatch, useSelector } from "react-redux";
import videosApi from "../api/videosApi";
import { clearVideoSubir, onAddNewVideo, seleccionarVideo, seleccionarVideoComentarios, setVideos, setVideosUsuario} from "../store/videos/videosSlice";

export const useVideoStore = () => {
    const { isLoadingVideos, videoSubir, videos, videoSeleccionado, comentarios, videosUsuario } = useSelector(state => state.videos);
    const dispatch = useDispatch();

    const startSavingVideo = async (titulo, palabraClave) => {
        const palabrasClave = [palabraClave];
        const refVideo = videoSubir;
        const { data } = await videosApi.post('/videos', { titulo, palabrasClave, refVideo});
        dispatch(onAddNewVideo(refVideo));
        console.log({ data })
        dispatch(clearVideoSubir());
    }

    const startLoadingAllVideos = async() => {
        try {
            const {data} = await videosApi.get('/videos/last');
            console.log({data});
            dispatch(setVideos(data.lastVideos))
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingVideo = async(id) => {
        try {
            const {data} = await videosApi.put(`/videos/visualizacion/${id}`);
            console.log('Cargando video');
            dispatch(seleccionarVideo(data.video));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingComents = async(id) => {
        try {
            const {data} = await videosApi.get(`/videos/comentarios/${id}`);
            console.log('Cargando comentarios');
            dispatch(seleccionarVideoComentarios(data.comentariosVideo));
        } catch (error) {
            console.log(error);
        }
    }

    const likeVideo = async(id) => {
        try {
            const {data} = await videosApi.put(`/videos/like/${id}`);
            console.log('Like video');
        } catch (error) {
            console.log(error);
        }
    }

    const dislikeVideo = async(id) => {
        try {
            const {data} = await videosApi.put(`/videos/dislike/${id}`);
            console.log('Dislike video');
        } catch (error) {
            console.log(error);
        }
    }

    const createComment = async(id, comentario) => {
        try {
            const { data } = await videosApi.post(`/videos/comentarios/${id}`, {comentario});
            console.log('Create comment');
        }catch (error) {
            console.log(error);
        }
    }

    const startLoadingVideosClave = async(palabraClave) => {
        try {
            const {data} = await videosApi.get('/videos/clave', {});
            console.log({data});
            dispatch(setVideos(data.videosClave));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingVideosUser = async() => {
        try {
            const {data} = await videosApi.get('/videos/user/');
            console.log({data});
            dispatch(setVideosUsuario(data.videosUsuario));
        } catch (error) {
            console.log(error);
        }
    }

    const startDeletingVideo = async(id) => {
        try {
            const {data} = await videosApi.delete(`/videos/${id}`);
            console.log('Eliminando video');
        } catch (error) {
            console.log(error);
        }
    }



    return {
        isLoadingVideos,
        videoSubir,
        videos,
        videoSeleccionado,
        comentarios,
        videosUsuario,
        startSavingVideo,
        startLoadingAllVideos,
        startLoadingVideo,
        startLoadingComents,
        likeVideo,
        dislikeVideo,
        createComment,
        startLoadingVideosClave,
        startLoadingVideosUser,
        startDeletingVideo
    }
}