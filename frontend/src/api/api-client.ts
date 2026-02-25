const API_URL = import.meta.env.VITE_API_URL;

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

const apiClient = async (url: string, options: FetchOptions = {}) => {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Autorization: `Bearer ${token}` } : {}),
  };

  let fullUrl = API_URL + url;
  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    fullUrl += `?${query}`;
  }

  const response = await fetch(fullUrl, { ...options, headers });
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};

export default apiClient;
