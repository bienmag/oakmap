const { gql, ApolloClient, InMemoryCache } = require('@apollo/client')

describe('GraphQL', () => {
  let tester

  beforeAll(() => {
    tester = new ApolloClient({
      uri: 'https://spacex-production.up.railway.app/',
      cache: new InMemoryCache(),
    })
  })

  describe('Schemas', () => {
    it('Should Validate Tree Structure', () => {
      expect(sum(1, 2)).toBe(1)
    })
  })

  describe('Queries', () => {
    it('Should get CEO of SpaceX', async () => {
      const res = await tester.query({
        query: gql`
          {
            company {
              ceo
            }
          }
        `,
      })
      expect(!!res.data.errors).toBe(false)
      expect(!!res.data.company.ceo).toBe(true)
    })
    it('Should get 3 Cores', async () => {
      const res = await tester.query({
        query: gql`
          query Launchpads($limit: Int) {
            cores(limit: $limit) {
              id
              status
              block
            }
          }
        `,
        variables: {
          limit: 3,
        },
      })
      expect(!!res.data.errors).toBe(false)
      expect(res.data.cores.length).toBe(3)
    })

    test('Should Get All Trees', () => {
      expect(sum(1, 2)).toBe(1)
    })
    test('Should Get A Specific Tree', () => {
      expect(sum(1, 2)).toBe(1)
    })
  })

  function sum(a, b) {
    return a + b
  }

  describe('Mutations', () => {
    it('Should Create A Tree', () => {
      expect(sum(1, 2)).toBe(1)
    })
    it('Should Update A Tree', () => {
      expect(sum(1, 2)).toBe(1)
    })
    it('Should Delete A Tree', () => {
      expect(sum(1, 2)).toBe(1)
    })
  })
})
