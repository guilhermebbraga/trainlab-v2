import Service from "./Service";

export default class UserService extends Service {
  constructor() {
    super();
  }

  async signup({ name, email, password, password2 }: {
    name: string
    email: string
    password: string
    password2: string
  }) {
    const response = await this.axiosInstance.post("/users", {
      name,
      email,
      password,
      password2,
    });

    return response.data
  }
}
