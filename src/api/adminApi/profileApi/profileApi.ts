import * as httpRequest from "../../../utils/httpRequest";

export const getProfileAdminById = async (adminId: string) => {
    try {
        const res = await httpRequest.get(`/employee/${adminId}/profile`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateProfileAdminById = async (adminId: string, birthDate: string, gender: string, phoneNumber: string) => {
    try {
        const res = await httpRequest.patch(`/employee/${adminId}/profile`, {
            birthDate, gender, phoneNumber
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changePasswordAdminById = async (adminId: string, oldPassword: string, newPassword: string) => {
    try {
        const res = await httpRequest.patch(`/auth/employee/${adminId}/change-password`, {
            oldPassword, newPassword
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};