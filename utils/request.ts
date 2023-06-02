export default async function request<TAPIResponse>(url: string, config: RequestInit = {}): Promise<TAPIResponse | null>  {
  try {
    const response = await fetch(url, config);
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}