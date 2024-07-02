import CarpInstance from "@carp-dk/client/CarpService";
import axios, { AxiosRequestConfig } from "axios";

// Carp adapter
const carpConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

const carpApi = new CarpInstance(axios.create(carpConfig));

export default carpApi;
