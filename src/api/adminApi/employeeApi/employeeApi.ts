import * as httpRequest from "../../../utils/httpRequest";

export const addEmployee = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string,
    branchId: string,
    email: string,
    phoneNumber: string,
    role: string
) => {
    try {
        const res = await httpRequest.post(`/auth/employee?role=${role}`, {
            username,
            password,
            firstName,
            lastName,
            birthDate,
            gender,
            branchId,
            email,
            phoneNumber,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllEmployee = async (
    key?: string,
    page?: number,
    status?: string
) => {
    try {
        const res = await httpRequest.get(
            `/employee?page=${page}&size=10${status !== "" ? `&status=${status}` : ""
            }${key !== "" ? `&key=${key}` : ""}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteEmployee = async (employeeId: string) => {
    try {
        const res = await httpRequest.deleted(`/employee/${employeeId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateEmployee = async (
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string,
    status: string,
    employeeId: string,
    email: string,
    phoneNumber: string,
    branchId: string
) => {
    try {
        const res = await httpRequest.put(`/employee/${employeeId}`, {
            firstName,
            lastName,
            birthDate,
            gender,
            status,
            email,
            phoneNumber,
            branchId
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getEmployeeById = async (employeeId: string) => {
    try {
        const res = await httpRequest.get(`/employee/${employeeId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const resetPassword = async (employeeId: string, passwordChange: string) => {
    try {
        const res = await httpRequest.patch(`/auth/employee/${employeeId}/set-password`, {
            password: passwordChange,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};