import Cookies from "js-cookie"
import Service from "./Service";

export interface Login {
  email: string;
  password: string;
}

export default class AuthService extends Service {
  constructor() {
    super();
  }

  async login({ email, password }: Login) {
    const response = await this.axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (!response) throw new Error("Falha");

    const { accessToken } = response.data

    if (accessToken) {
      Cookies.set("TrainLabAuth", accessToken)
    }

    return response.data;
  }
}
