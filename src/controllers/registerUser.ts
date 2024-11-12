import { _post } from './apiClient';

interface RegisterResponse {
    message: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse | null> => {
    try {
        const response = await _post<RegisterResponse>(process.env.REACT_APP_REGISTER as string, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        return null;
    }
};

export { registerUser };
