import * as httpRequest from "../../../utils/httpRequest";

export const addAlbum = async (newAlbum: FormData) => {
    try {
        const res = await httpRequest.post(`/album`, newAlbum, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllAlbum = async (
    album_type?: string,
    pageCurrent?: number,
    sort_type?: string
) => {
    try {
        const res = await httpRequest.get(
            `/album?page=${pageCurrent}&size=10${album_type !== "" ? `&album_type=${album_type}` : ""
            }${sort_type !== "" ? `&sort_type=${sort_type}` : ""}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteAlbum = async (albumId: string) => {
    try {
        const res = await httpRequest.deleted(`/album/${albumId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};