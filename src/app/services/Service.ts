import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default class Service {
  protected axiosInstance: AxiosInstance;
  private static isRedirecting = false;
  private abortController: AbortController;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.15.54:9090",
    });
    this.abortController = new AbortController();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        let token;

        if (typeof window === "undefined") {
          const { cookies } = await import("next/headers")

          const cookieStore = await cookies();
          token = cookieStore.get("TrainLabAuth")?.value;
        } else {
          token = Cookies.get("TrainLabAuth");
        }

        console.log("Toke extraido dos Cookies: ", token);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (this.abortController.signal.aborted) {
          this.abortController = new AbortController();
        }

        config.signal = this.abortController.signal;

        return config;
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      },
    );
  }

  private handleError(error: AxiosError) {
    if (axios.isCancel(error)) return;

    if (error.response) {
      const status = error.response.status;
      const isBrowser = typeof window !== "undefined";

      switch (status) {
        case 401:
          if (!Service.isRedirecting && isBrowser) {
            Service.isRedirecting = true;
            this.abortController.abort();
            Cookies.remove("TrainLabAuth");
            toast.error("Sessão expirada. Redirecionando...");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
          break;

        case 403:
          toast.error("Você não tem permissão para isso.");
          break;
        case 422:
          toast.error("Dados inválidos. Verifique os campos.");
          break;
        case 500:
          toast.error("Erro no servidor. Tente novamente mais tarde.");
          break;
        default:
          console.error(`Erro ${status}:`, error.response.data);
      }
    } else if (error.request) {
      toast.error("Não foi possível contactar o servidor.");
    } else {
      console.error("Erro de configuração:", error.message);
    }
  }
}
