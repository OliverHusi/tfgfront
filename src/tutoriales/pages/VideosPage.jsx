import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVideoStore } from "../../hooks/useVideoStore";
import { NavBar } from "../components/NavBar";
import ReactPlayer from 'react-player';
import { ComentarioCard } from "../components/ComentarioCard";
import { useForm } from "../../hooks/useForm";

const comentFields = {
    input: ''
  }

export const VideosPage = () => {
    const { id } = useParams();
    const { videoSeleccionado, comentarios, startLoadingComents, likeVideo, dislikeVideo, createComment } = useVideoStore();

    const { input, onInputChange} = useForm(comentFields);

    useEffect(() => {
        startLoadingComents(id);
    }, []);

    const darLike = () => {
        likeVideo(id);
    }

    const darDislike = () => {
        dislikeVideo(id);
    }

    const comentar = () => {
        createComment(id, input);
        console.log(input);
    }

    return (
        <>
            <NavBar />
            <div><ReactPlayer className='react-player' url={videoSeleccionado.refVideo} controls width='100%' /></div>
            <h2>{videoSeleccionado.titulo}</h2>
            <div>
                <div style={{ float: "left", width: "50%" }}>
                    <span>
                        {videoSeleccionado.visualizaciones}
                    </span>
                    &nbsp;
                    <span>
                        Visitas
                    </span>
                    <div>
                        <button onClick={darLike}>Like</button> <span>{videoSeleccionado.likes}</span>
                    </div>
                    <div>
                        <button onClick={darDislike}>Dislike</button> <span>{videoSeleccionado.dislikes}</span>
                    </div>
                    <div className="mt-2">
                        <input type="text" placeholder="Comentario" className="form-control" style={{width: "50%"}} name="input" value={input} onChange={onInputChange}/>
                        <button onClick={comentar} className="mt-1">Crear comentario</button>
                    </div>
                </div>
                <div style={{ float: "inherit" }}>
                    <div style={{ overflow: 'auto' }}>
                        {
                            comentarios.map(comentario => (
                                <ComentarioCard key={comentario.id} {...comentario} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
        // <ReactPlayer url={videoSeleccionado.refVideo} />
    )
}