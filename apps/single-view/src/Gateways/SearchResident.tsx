export const SearchResident = async (
  searchParams: string,
  domain: string
): Promise<any> => {
  const response = await fetch(
    `${process.env.SV_API_PROTOTYPE}/search?searchText=${searchParams}&domain=${domain}`
  );
  if (response.status >= 400) {
    console.log(response);
    return new Error("Error searching");
  }
  console.log(response);
  return response.json();
};
