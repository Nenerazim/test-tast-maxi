import axios from 'axios';
import * as process from 'node:process';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.response.use(undefined, async (error) => {
  throw error;
});

instance.interceptors.response.use((response) => response.data);

export {instance as baseClient};
