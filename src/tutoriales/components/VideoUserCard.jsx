import { useVideoStore } from '../../hooks/useVideoStore';
import { Link } from "react-router-dom";

export const VideoUserCard = ({
    id,
    titulo,
    palabrasClave,
    refVideo,
    usuario,
    likes,
    dislikes,
    fecha,
    visualizaciones
}) => {

    const { startLoadingVideo, startLoadingComents, startDeletingVideo, startLoadingVideosUser } = useVideoStore();

    const clicVideo = () => {
        startLoadingVideo(id);
        startLoadingComents(id);
        console.log('hola');
    }

    const eliminarVideo = () => {
        console.log(`Eliminando video ${id}`);
        startDeletingVideo(id);
        startLoadingVideosUser();
    }

    return (
        <div className="col mb-2">
            <div className="card">
                <div className="row no-gutters">

                    <div className="col-8">
                        <div className="card-body">
                            <Link to={`/video/${id}`} onClick={clicVideo}>
                                <h5 className="card-title">{titulo}</h5>
                            </Link>


                            <p className="card-text">{palabrasClave[0]}</p>

                            <p className="card-text">
                                <small className="text-muted">{visualizaciones} Visualizaciones</small>
                            </p>
                            <p className="card-text">
                                <small className="text-muted">{likes} Likes</small>
                            </p>

                            <button onClick={eliminarVideo}>
                                Eliminar
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}