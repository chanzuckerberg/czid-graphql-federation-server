// resolvers.ts
import fetch from 'node-fetch';
import { Resolvers } from './.mesh';

// export default {
//   Query: {
//     CZID: async () => {
//       const response = await fetch('http://web:3001/graphql');
//       const data = await response.json();
//       return data;
//     },
//     Background: async () => {
//       console.log('Background resolver');
//     },
//   },
// };

export const resolvers: Resolvers = {
  // Background: {
  //   resolve(root, args, context, info) {
  //     console.log('Background resolver');
  //   }
  // },
  Background: {
    other_backgrounds: async (root, args, context, info) => {
      console.log('other_backgrounds resolver');
      return [];
    }
  },

}

// export default resolvers;