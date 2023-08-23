// resolvers.ts
import fetch from "node-fetch";
import { Resolvers } from "./.mesh";

export const resolvers: Resolvers = {
  Query: {
    Background: async (root, args, context, info) => {
      const response = await fetch(`http://web:3000/pub/${args.snapshotShareId}/backgrounds.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const ret = data.other_backgrounds.concat(data.owned_backgrounds);
      return ret.map((item: any) => {
        return {
          ...item,
          is_mass_normalized: item.mass_normalized
        };
      }, []);
    },
  },
};

