import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://sepolia.easscan.org/graphql'

const tokensQuery = `
    query GetAttestations($where: AttestationWhereInput) {
        attestations (where: $where)  {
            recipient
            attester
            decodedDataJson
        }
    }  
`

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

export async function getAttestations(user: `0x${string}`) {
    try {
        return await client
            .query({
                query: gql(tokensQuery),
                variables: {
                    where: {
                        "recipient": {
                            "contains": user
                        }
                    },

                },
            })
    } catch (error) {
        console.log(error)
    }
}
