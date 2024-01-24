import { findAndParseConfig } from "@graphql-mesh/cli";
import { getMesh } from '@graphql-mesh/runtime';
import { join } from 'path';

import { printSchemaWithDirectives } from '@graphql-tools/utils';

const mesh$ = findAndParseConfig({
  dir: join(__dirname, '..'),
}).then(config => getMesh(config));

describe('CZ ID graphQL federation generated schema', () => {
  it('should generate a valid schema', async () => {
    const { schema } = await mesh$;

    expect(printSchemaWithDirectives(schema)).toMatchSnapshot();
  });
});
