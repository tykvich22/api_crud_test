const API_HOST = import.meta.env.VITE_API_HOST;

export interface ApiRequest {
	path: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	token?: string;
	body?: Record<string, any> | null;
}

export const api = async <T>({
	path,
	method = 'GET',
	token = '',
	body = null,
}: ApiRequest): Promise<T> => {
	const url = `${API_HOST}${path}`;

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};

	if (token) {
		headers['x-auth'] = token;
	}

	const options: RequestInit = {
		method,
		headers,
	};

	if (body) {
		options.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: T = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
