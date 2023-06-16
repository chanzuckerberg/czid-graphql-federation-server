// resolvers.ts
import fetch from 'node-fetch';

export default {
  Query: {
    CZID: async () => {
      const response = await fetch('http://web:3001/graphql');
      const data = await response.json();
      return data;
    },
  },
};
