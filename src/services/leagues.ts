import API from './index'
import { ILeague } from '@/types/leagues'
import { API_TOKEN } from '@/utils/constants'

const getLeagues = async ({
  search = '',
 }: {
  search: string
 }): Promise<any> => {
 

   const { data } = await API.get('football/leagues', {
    params: {
      ...(search ? { search } : {}),
      'api_token': API_TOKEN,
     },
  })

  return data
}
const getLeague = async (id: string): Promise<ILeague> => {
  const { data } = await API.get(`/api/leagues/${id}`)
  return data
}
export { getLeague, getLeagues }
