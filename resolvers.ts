// resolvers.ts
import fetch from "node-fetch";
import { Resolvers } from "./.mesh";

export const resolvers: Resolvers = {
  Query: {
    Samples: async (root, args, context, info) => {
      const response = await fetch(`http://web:3000/samples/index_v2.json?projectId=${args.projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const ret = data.samples
      return ret.map((item: any) => {
        return {
            id: item.id,
            name: item.name,
            entity: {
              created_at: item.created_at,
              project_id: item.project_id,
            },
            reference_genome: {
              id: item.host_genome_id,
            },
          };
      }, []);
    },
  },
};
