import axios, { AxiosInstance } from "axios";

export default class Service {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.15.54:9090",
    });
  }
}