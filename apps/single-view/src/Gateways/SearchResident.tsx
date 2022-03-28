export const SearchResident = async (
  searchParams: string,
  domain: string
): Promise<any> => {
  const response = await fetch(
    `https://f7jmln42lb.execute-api.eu-west-2.amazonaws.com/dev/search?searchText=${searchParams}&domain=${domain}`
  );
  if (response.status >= 400) {
    console.log(response);
    return new Error("Error searching");
  }
  console.log(response);
  return response.json();
};
