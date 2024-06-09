import axios from "axios";

const fakeApi = axios.create({
  baseURL: 'https://0a6b-2804-d55-528e-4c00-216f-dc36-79e9-3099.ngrok-free.app/',
});

export {fakeApi}