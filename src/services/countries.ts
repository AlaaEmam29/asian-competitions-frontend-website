import API  from './index'
import { API_TOKEN } from '@/utils/constants'
const getCountries = async ({page}: {page: number}): Promise<any> => {
    const url =  `core/countries?api_token=${API_TOKEN}&page=${page}&includes=leagues`;
   const { data } = await API.get(url);
  return data;
};

export { getCountries };