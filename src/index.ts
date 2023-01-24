import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { request, gql } from 'graphql-request';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Project {
    id: Int
    name: String
    createdAt: String
    updated_at: String
    public_access: Int
    days_to_keep_sample_private: Int
    background_flag: Int
    description: String
    subsample_default: Int
    max_input_fragments_default: Int
    total_sample_count: Int
    # creator: Types::UserType, null: true
    # samples: [Types::SampleType], null: true
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    project(id: Int!): Project
    projects: [Project]
}
`;

// TODO: Remove hardcoded cookie
const fetchProject = async (parent, args) => {
    console.log(args)
    const projectId = args.id;
    const requestHeaders = {
        'Cookie': 'OptanonAlertBoxClosed=2022-11-14T19:43:03.046Z; __profilin=p=t,dp=t; OptanonConsent=isIABGlobal=false&datestamp=Tue+Jan+24+2023+12:31:13+GMT-0500+(Eastern+Standard+Time)&version=6.10.0&hosts=&landingPath=NotLandingPage&groups=C0002:1,C0001:1&geolocation=CA;ON&AwaitingReconsent=false; _czid_session=RUdSZHlOZWdpR0twZXg0Z2sxbFJKZzFUUFM5V3JhRDNPYkZSRk1JYVFlbzFUZmQzeHFZRlphL2pnYnV6eU4vOWY5cWl5eUZvSm9sL1pmaUhLMEowUVpiZXZGcjM2Z21XWFQ3WHhKVnZZd0JQdVl4c2lEV1dBdmJ3bHJwTHpxcWRWR1Jha1R5WVJDdmF0Sm5qUFpRQmcvNktxMTVyb2IyUWdVTzJFS3lWeVFoL3lpOTNDbXRmbDlsWWVLcElreXBvZzJJem02NjlPWEpxZVNtbmZQUlZNOWxGdFNPQUhsVFdWQldxNXMwWVV6WWNKKzhjNTUrQllZd1hyc0xzeXJSeWVMRnRtZHZGbENOYm1lMjdZc1ZyblJBWDR3MmRRVS9SR3l1MzJkSW5ld1V3Uml1Z3ZzUVQ4bDVmanRKc2hpMEc0bGZyS09HMVlRK2JhbkdTNnZpUkVsWkRDMTlQKy9rb2lJTkk1Qkc5dVFSSFdvNHZPTkZaV3Qxbk1NWVZQQ1RYVldsMGt2NTZVSisxK05JdUM0RlRkMGVjOG5yMEYwMkdmY3pWbEJMaUNVYjlGV2RrcCtmVGhYOXRJTDU5S1JsZFdtVjlyYTVlbHBtSmxHdHlVUmowRFdBYXlyLzZnbDhNdkFxc3VNVnl6VnYvdmlXT1dpYWI3ZnBod25MTE9jTUlRbnlwSTdocE9nZHh0QXQwNXFUSE5pNGRrNlIvYWNWRVVkc0Nud2xLN3puQk5NZUtQR1lqV00rTnJYN0xzQlRQTVZ3S3FoZUMyaCt4Q2UwYjZnenc1cW1sWGRTVHB5R3lyYXlGUDFOQUVkcnFDbHJ1eXdFR3dyTFZBVHRvQkV1U2V4d001L3liZGhVdTBpR2JpdWxFM25zbnlpMmNRNXdaK2VvT1NTdWh2MjlVMEV1czBmRlF2c2dzT0dRUGZRS2s4RDBRS2FtbmRGZENySjE5UTlnVjdIdktjZVBaSjBUWTlqR2o4ZU5rUkxKNWhxYW4ySUFGb3cwSVMwWXl3TDJYT3g5U3hYZEZNU0lHYXpvWVhqdGFDSVMwUksvTHF5RTBNTWJndWJTUjBzeXl1T2JTTktxQ25KdFhSM1F2UTlnd1QvZWRXWDVoYStDNlFSaUNrNWh6Z29CSnVJQUJpYW05YmxWYUx4Umh0SE4ydHBsNW5zc1JicEZQZ0pxaTRZVThRR2VqWlBET2h4WVJOVkVkaXM5NkNDU2lGS0p1eE1kNVpyZDlaeUc5UHRxSUs1dzFvMW83QWRqdXhReE9XR1JNcGtLd1NQbVAzUDRHQXhqYW4wVkJzMndacklDVEVOTUh3djlvaitKVUNpVTdodTZzR2trbnlmcHNTOUZhcUIxbEZ1RnVJUmZ4ZU1jT0NxUGFoZVRlWUNFdzY1TER4YXE3WG9hY3k2Z1dxWUcvdXRORzE2TFh1Y0tEYzhtK0ZsT01SM3ZPRnhZTVdESTJBYi90a3JtY2lqMXlFTmd6L1BYOENUbHU2cUtKc0daTmtwUnBRVXJ3ejVnUm9LMkNPKytMdGdOdFBkcjVaRWJWYXBhQnMxdDlzcXVKVzg5YWFwTUx5aXBEY2g0QkhHSitHVVNhOVRVUDBEcVAveEh6K2RwZyt3QUx4cVNPKzZsaW1ySkZrYitSOHVGSEFON0RObytwVVhTZlZ5SWpaMlJRYkRma1lORjlTenBYekpLWmxZT3hRcDlQTE5ud09LUk40Uk93bmc4TlN0QzkwR0lGb29CbndvS3dKZldjUHpPU2o3aHZ0dVg1SjB5OFJYREV3QWtTOHl3WEtZTWpXaTYxL2Y2ZXR6RDJ2TkI1UlpjOW5IRC9qSk9jcUMwZEpmaTFwSzhhUFozNmFveFZZRTNNYXBtTXN1dDR0MDdPZkh5UVYwMWZ0Z3NFSXRBNk44ZXBmbVVoTWJVeHdKTWEzUVNMTC9lSlV0SnVQWUxEWTBncXdSYldWNXh3U1BFMFlDZ09vQnpSVHkyMmVkMGljQjhCaWNFZXpOYURJK1h0c3pGRWt3cG5qWVZhT1hERjlvWGQ4UDNGWmlLUkp1d1dnTk9RbkI0ODlwSzZIOXdvcWgzUlRkM3JwaXptYWlaTjVBOFk1Nm5wUENGYzNkSCtoaUs5cUpqNUl5V3I3REp0d0Fmc0x2dk1uNFdZMXVkeXlNc0lJalBGTmJhOUc2SnV0dGduYUlpdVNzSVRoRW53bjhQQWlLUVdZNHpBSWVrbCtPM1g5YXZDc1dsVWlnPT0tLUhhR1hycEZKRVcrK0NtRU02Y1BKMXc9PQ==--53a0642efd1b819f817393fb667b6b34790a21bb'
    };
    const query = gql`query GetProjects($projectId: Int!) {
    project(id: $projectId) {
      id
      name
      createdAt
      publicAccess
      totalSampleCount
      }
    }`;
    const res = await request("http://localhost:3000/graphql", query, { projectId: parseInt(projectId) }, requestHeaders);
    return res.project;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves projects from the "projects" array above.
const resolvers = {
    Query: {
        project: async (parent, args) => await fetchProject(parent, args),
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
