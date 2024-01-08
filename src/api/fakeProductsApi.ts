import axios from 'axios';
import {ApiResponse} from '../types/productTypes';

export const fakeProductsApi = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      'https://my-json-server.typicode.com/sandaun/productList/db',
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
