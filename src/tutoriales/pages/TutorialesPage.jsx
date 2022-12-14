import { NavBar } from "../components/NavBar"
import { VideoCard } from "../components/VideoCard"
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { useVideoStore } from "../../hooks/useVideoStore";
import { useForm } from "../../hooks/useForm";

const searchFields = {
  input: ''
}

export const TutorialesPage = () => {
  const dispatch = useDispatch();

  const { input, onInputChange} = useForm(searchFields);

  const {startLoadingAllVideos, videos, startLoadingVideosClave } = useVideoStore();

  const onSearchSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    startLoadingVideosClave(input);
  }

  useEffect(() => {
    startLoadingAllVideos();
  }, [])

  return (
    <>
      <NavBar />
      <form onSubmit={onSearchSubmit} className="mb-2">
        <input type="text" placeholder="Buscar un video" className="form-control" name="input" value={input} onChange={onInputChange}/>
      </form>
      {
        videos.map(video => (
          <VideoCard key={video.id} {...video}/>
        ))
      }
    </>
  )
}