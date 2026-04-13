import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "sonner";
const abortController = new AbortController();

export default class Service {
  protected axiosInstance: AxiosInstance;
  private static isRedirecting = false;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.15.54:9090",
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use((config) => {
      config.signal = abortController.signal;
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      },
    );
  }

  private handleError(error: AxiosError) {
    // Se o erro for um cancelamento proposital, não fazemos nada
    if (axios.isCancel(error)) return;

    if (error.response) {
      const status = error.response.status;
      const isServer = typeof window === "undefined";

      switch (status) {
        case 401:
          if (!Service.isRedirecting && !isServer) {
          Service.isRedirecting = true;
          
          // Cancela todas as outras requisições que estão "na fila"
          abortController.abort(); 

          localStorage.removeItem("token");
          toast.error("Sessão expirada. Redirecionando...");
          
          // Força o reload para limpar o estado da aplicação
          window.location.href = "/";
        }
        return;
        
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
