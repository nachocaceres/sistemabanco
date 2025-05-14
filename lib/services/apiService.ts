/**
 * API Service
 * 
 * This service handles all API requests and provides
 * standard methods for interacting with the backend.
 */

// Default headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Handles HTTP errors and provides a consistent error format
 * @param response - Fetch response object
 * @returns Response or throws error
 */
async function handleResponse(response: Response) {
  if (!response.ok) {
    // Get error details from response if available
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || `Error ${response.status}`;
    } catch (e) {
      errorMessage = `Error ${response.status}: ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }
  
  // Check if the response has content
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return await response.json();
  }
  
  return await response.text();
}

/**
 * Generic GET request
 * @param url API endpoint
 * @param customHeaders Optional custom headers
 * @returns Promise with response data
 */
export async function get(url: string, customHeaders = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  });
  
  return handleResponse(response);
}

/**
 * Generic POST request
 * @param url API endpoint
 * @param data Request body data
 * @param customHeaders Optional custom headers
 * @returns Promise with response data
 */
export async function post(url: string, data: any, customHeaders = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse(response);
}

/**
 * Generic PUT request
 * @param url API endpoint
 * @param data Request body data
 * @param customHeaders Optional custom headers
 * @returns Promise with response data
 */
export async function put(url: string, data: any, customHeaders = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse(response);
}

/**
 * Generic DELETE request
 * @param url API endpoint
 * @param customHeaders Optional custom headers
 * @returns Promise with response data
 */
export async function del(url: string, customHeaders = {}) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  });
  
  return handleResponse(response);
}

/**
 * Generic PATCH request
 * @param url API endpoint
 * @param data Request body data
 * @param customHeaders Optional custom headers
 * @returns Promise with response data
 */
export async function patch(url: string, data: any, customHeaders = {}) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse(response);
}

// Export the service
const apiService = {
  get,
  post,
  put,
  delete: del,
  patch,
};

export default apiService;