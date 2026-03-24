import Service from "./Service";

export class AuthService extends Service {
  constructor() {
    super();
  }

  async login({ email, password }: { email: string; password: string }) {
    const response = await this.axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (!response) throw new Error("Falha");

    const { accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem("@trainLab:token", accessToken);

      this.axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    }

    return response.data;
  }
}
