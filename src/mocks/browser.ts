import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { leagues } from './data'

const normalizeText = (text: string) => {
  return text.toLowerCase()
}

const worker = setupWorker(
  http.get('/api/leagues', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || ''
    const category =
      url.searchParams.get('category') === 'All' ? '' : url.searchParams.get('category') || ''

    const filteredLeagues = leagues.filter((league) => {
      const matchesSearch =
        search === '' ||
        normalizeText(league.name).includes(normalizeText(search)) ||
        normalizeText(league.category).includes(normalizeText(search))

      const matchesCategory = category === '' || league.category === category

      return matchesSearch && matchesCategory
    })

    return HttpResponse.json(filteredLeagues)
  }),

  http.get('/api/leagues/:id', ({ params }) => {
    const league = leagues.find((league) => league.id === parseInt(params.id as string, 10))

    if (!league) {
      return HttpResponse.json({ error: 'League not found' }, { status: 404 })
    }

    return HttpResponse.json(league)
  }),
)

export default worker
