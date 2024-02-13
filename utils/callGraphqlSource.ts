import { ResolverContext, getEnrichedToken } from "./enrichToken";

export const callGraphqlSource = async (args, context) => {
  const enrichedTokenResponse = await getEnrichedToken(context as unknown as ResolverContext);
  const enrichedToken = (await enrichedTokenResponse.json()).token

  // TODO: Implement the actual call to the graphql source, something like the below
  // const resp = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     Cookie: context.request.headers.get("cookie"),
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${enrichedToken}`,
  //   },
  // );
};
