export default async function request<TAPIResponse>(url: string, config: RequestInit = {}): Promise<TAPIResponse | null>  {
  try {
    const response = await fetch(url, config);
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};