import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../constants/apiConstants';
import { IProductResponse } from '../../types/product-types';

export default async function getProducts() {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/products?limit=50`;
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<IProductResponse> = await axios(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { results } = response.data;
  return results;
}
