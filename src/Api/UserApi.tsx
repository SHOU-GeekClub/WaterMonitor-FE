
import axios, {AxiosError, AxiosResponse} from "axios";
import {Config} from "../config";
import {Token} from "./Token";

export interface UserLoginParams {
    username: string;
    password: string;
}

export class UserApi {
    static async login(params: UserLoginParams): Promise<Token> {
        const response: AxiosResponse<Token> = await axios.post(
            `${Config.basePath}/user/login`,
            params
        );
        return response.data;
    }

    static async checkToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("用户尚未登录");
        }
        const response: AxiosResponse<Token> = await axios.get(
            `${Config.basePath}/user/checkToken`,
            {
                headers: {
                    "Application-Token": token,
                },
            }
        );
        return response.data;
    }

    static async handleChangePwd(data:any) {
        const response: AxiosResponse<Token> = await axios.post(
            `${Config.basePath}/user/userChangePassword`,
            data,
            {
                headers: {
                    "Application-Token": localStorage.getItem("token"),
                },
            }
        );
        return response.data;
    }
}

