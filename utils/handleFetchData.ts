export const handleFetchedData = (
  key: string,
  movies: Record<string, any>,
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  if (movies[key]) {
    setState(movies[key].data); // Set the local state with fetched data
    console.log(`Fetched ${key}:`, movies[key]); // Log the fetched data
  }
};
