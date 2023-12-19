export async function universalSearch(searchQuery, fetchFunction) {
  if (!searchQuery) {
    return await fetchFunction();
  }

  const data = await fetchFunction(searchQuery);
  return data;
}
