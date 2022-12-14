import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useVideoStore } from "../../hooks/useVideoStore"
import { startUploadingVideo } from "../../store/videos/thunks";
import { NavBar } from "../components/NavBar"
import { VideoUserCard } from "../components/VideoUserCard";

const uploadFields = {
    titulo: '',
    palabraClave: ''
  }

export const UserPage = () => {

    const dispatch = useDispatch();

    const { startSavingVideo, videosUsuario } = useVideoStore();

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingVideo(target.files));
    }

    const subida = async () => {
        await startSavingVideo(titulo, palabraClave);
    }

    const fileInputRef = useRef();

    const { titulo, palabraClave, onInputChange} = useForm(uploadFields);

    return (
        <>
            <NavBar />
            <input type="file" onChange={onFileInputChange} style={{ display: 'none' }} ref={fileInputRef} />
            <button onClick={() => fileInputRef.current.click()}>
                Seleccionar video
            </button>
            <form className="mb-2 mt-1">
                <input type="text" placeholder="Titulo video" className="form-control" name="titulo" value={titulo} onChange={onInputChange}/>
                <input type="text" placeholder="Palabra clave" className="form-control" name="palabraClave" value={palabraClave} onChange={onInputChange}/>
            </form>
            <button onClick={subida} className="mb-3">
                Subir
            </button>

            {
                videosUsuario.map(video => (
                    <VideoUserCard key={video.id} {...video} />
                ))
            }
        </>
    )
}