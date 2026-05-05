import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface ApiErrorData {
  now: Date;
  value: number;
  excepetionName: string;
  message: string;
}

export default class Service {
  protected axiosInstance: AxiosInstance;
  private static isRedirecting = false;
  private abortController: AbortController;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.15.54:9090",
      timeout: 10000,
    });
    this.abortController = new AbortController();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        let token;

        if (typeof window === "undefined") {
          const { cookies } = await import("next/headers");

          const cookieStore = await cookies();
          token = cookieStore.get("TrainLabAuth")?.value;
        } else {
          token = Cookies.get("TrainLabAuth");
        }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (this.abortController.signal.aborted) {
          this.abortController = new AbortController();
        }

        config.signal = this.abortController.signal;

        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      },
    );
  }

  private handleError(error: AxiosError<ApiErrorData>) {
    const status = error.response?.status;
    const isBrowser = typeof window !== "undefined";
    const errorData = error.response?.data;

    console.log(`[API Error] ${status}:`, errorData || error.message);

    if (!isBrowser) return;

    switch (status) {
      case 401:
        this.handleUnauthorized()
        break;

      case 403:
        toast.error("Você não tem permissão para isso.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        break;
      case 422:
        toast.error("Dados inválidos. Verifique os campos.");
        break;
      case 500:
        toast.error("Erro no servidor. Tente novamente mais tarde.");
        break;
      default:
        if (!error.response) {
          toast.error(
            "Não foi possível conectar ao servidor. Verifique sua conexão.",
          );
        } else {
          toast.error(errorData?.message || "Ocorreu um erro inesperado.");
        }
    }
  }

  private handleUnauthorized() {
    if (Service.isRedirecting) return;

    Service.isRedirecting = true;
    this.abortController.abort(); // Cancela outras requisições pendentes

    Cookies.remove("TrainLabAuth");

    toast.error("Sessão expirada. Redirecionando para o login...", {
      duration: 3000,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  }
}
