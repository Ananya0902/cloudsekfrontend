import { _post } from "./apiClient";
import IUser, { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../@types/user";

const loginUser = async (credentials: LoginRequest): Promise<{ user: IUser | null; token: LoginResponse | null }> => {
    try {
        const response = await _post<{ user: IUser | null; token: LoginResponse | null }>("/auth/login", credentials);
        const { user, token } = response.data
        return { user, token }
    } catch (error) {
        console.error("Error logging in:", error);
        return { user: null, token: null };
    }
};

const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse | null> => {
    try {
        const response = await _post<RegisterResponse>("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        return null;
    }
};

const verifyEmail = async (email: string): Promise<void> => {
    try {
        await _post("/auth/verifyEmail", email)
    } catch (error) {
        console.log("Error verifying email: ", error)
    }
}

const validateOtp = async (email: string, otp: string): Promise<{ message: string | null }> => {
    try {
        const response = await _post<{ message: string | null }>("/auth/validateOtp", { email, otp })
        return response.data
    } catch (error) {
        console.log("Error validating OTP: ", error)
        return { message: null }
    }
}

const updatePassword = async (password: string): Promise<{ message: string | null }> => {
    try {
        const response = await _post<{ message: string | null }>("/auth/updatePassword", { password })
        return response.data
    } catch (error) {
        console.log("Error updating password: ", error)
        return { message: null }
    }
}

export { loginUser, registerUser, verifyEmail, updatePassword, validateOtp }