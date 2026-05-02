const API_BASE_URL = "https://nondramatic-absolvable-karter.ngrok-free.dev";

// Хелпер для додавання токену до запитів
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Хелпер для обробки помилок
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Помилка запиту");
  }
  return response.json();
};

// === AUTHENTICATION ===

export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/adminLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

// === ORDERS (BOOKINGS) ===

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/api/createOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  return handleResponse(response);
};

export const getOrders = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.status) params.append("status", filters.status);

  const queryString = params.toString();
  const url = `${API_BASE_URL}/api/getOrders${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getOrder = async (orderId) => {
  const response = await fetch(`${API_BASE_URL}/api/getOrder?id=${orderId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const updateOrder = async (orderId, updateData) => {
  const response = await fetch(`${API_BASE_URL}/api/updateOrder`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ id: orderId, ...updateData }),
  });
  return handleResponse(response);
};

export const deleteOrder = async (orderId) => {
  const response = await fetch(`${API_BASE_URL}/api/deleteOrder`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ id: orderId }),
  });
  return handleResponse(response);
};
