import { readFileSync } from 'fs';
import EasyGraphQLTester from 'easygraphql-tester';
import { describe, test, beforeAll } from '@jest/globals';
const schemaCode = readFileSync('./schema.graphql', { encoding: 'utf-8' });
describe('Queries', () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode);
    });
    test('Should get friends with a nested query', () => {
        const query = `
	            query GET_FRIENDS($userId: ID!){
	                user(id: $userId) {
	                    id
	                    friends {
	                        id
	                        firstname
	                        lastname
	                    }
	                }
	            }
	        `;
        tester.test(true, query, { userId: '0' });
    });
});
