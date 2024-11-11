import axios, { AxiosResponse } from "axios";
import IUser from "../@types/user";

// interface UserInfo {
//     id: number;
//     name: string;
//     email: string;
// }

interface LoginResponse {
    token: string;
    user: IUser;
}

interface LoginRequest {
    username: string;
    password: string;
}

const loginUser = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
            process.env.REACT_APP_LOGIN as string,
            credentials
        );
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}

const credentials: LoginRequest = {
    username: "exampleUser",
    password: "examplePassword"
};

const loginPromise = loginUser(credentials);
loginPromise.then(data => {
    if (data) {
        console.log("Login successful:", data);
    } else {
        console.log("Login failed.");
    }
});

export { loginUser };
