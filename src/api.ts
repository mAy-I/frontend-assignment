import { Line } from "./types";

const BASE_URL = "http://localhost:8000";

const fetchWrapper = async <T = Record<string, any>>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export const fetchLines = () => fetchWrapper<Line[]>("/lines");

export const postLine = (body: Omit<Line, "id">) =>
  fetchWrapper<Line>("/lines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const patchLine = (id: number, body: Pick<Line, "coordinates">) =>
  fetchWrapper<Line>(`/lines/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const deleteLine = (id: number) =>
  fetchWrapper<{}>(`/lines/${id}`, { method: "DELETE" });
