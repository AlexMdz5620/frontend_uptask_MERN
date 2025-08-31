import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
    userSchema,
    type CheckPassForm,
    type ConfirmToken,
    type ForgotPasswordForm,
    type NewPassForm,
    type RequestConfirmationCodeForm,
    type UserLoginForm,
    type UserRegistrationForm
} from '../types/index';

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = '/auth/confrim-account';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function forgotPass(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function valideToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePassWithToken({ formData, token }: { formData: NewPassForm, token: ConfirmToken['token'] }) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api.get('/auth/user');
        const res = userSchema.safeParse(data);
        if (res.success) {
            return res.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function checkPass(formData: CheckPassForm) {
    try {
        const url = '/auth/check-password';
        const { data } = await api.post<string>(url, formData);
        return data; 
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
