export const parseRefFasta = (fullPath: string | null | undefined) => {
  if (!fullPath) {
    return null;
  }
  const afterLastSlash = fullPath.split("/").pop();
  return afterLastSlash;
}