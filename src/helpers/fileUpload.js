export const fileUpload = async(file) => {
    const cloudURL = 'https://api.cloudinary.com/v1_1/dk4rx07q2/upload';

    const formData = new FormData();
    formData.append('upload_preset','videos-app');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    }catch (error) {
        throw new Error(error.message);
    }
}