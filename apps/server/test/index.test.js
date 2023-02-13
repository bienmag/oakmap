require('jest')
const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')

const schemaCode = fs.readFileSync(
  path.join(__dirname, '.', 'schema.graphql'),
  'utf-8'
)
describe('Queries', () => {
  let tester
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode)
  })

  test('Should validate that the server is healthy', () => {
    const query = `#graphql
	    query Query {
            getTrees() {
                _id
                treeName
                description
            }
        }
    `
    tester.test(true, query)
  })
})
