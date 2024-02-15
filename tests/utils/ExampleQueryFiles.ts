import { readFileSync } from "fs";
import { join } from "path";

export function getExampleQuery(graphqlFile: string): string {
  return readFileSync(
    join(__dirname, `../../example-queries/${graphqlFile}.graphql`),
    {
      encoding: "utf8",
    }
  );
}

export function getSampleResponse(responseFile: string): any {
  return JSON.parse(
    readFileSync(
      join(__dirname, `../../sample-responses/${responseFile}.json`),
      {
        encoding: "utf8",
      }
    )
  );
}
