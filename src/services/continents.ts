import API , { URL } from './index'
const getContinents = async (): Promise<any> => {
    const url = URL('core/continents' )
  const { data } = await API.get(url)   
  return data
}
export { getContinents }