const customFetch = (path: string, config?: RequestInit | undefined) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_SERVER}` + path, config);
};

export default customFetch;
