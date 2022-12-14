import { fileUpload } from "../../helpers/fileUpload";
import { onAddNewVideo } from "./videosSlice";

export const startUploadingVideo = (files = []) => {
    return async (dispatch) => {
        const url = await fileUpload(files[0]);
        dispatch(onAddNewVideo(url));
    }
}