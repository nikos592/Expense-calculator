import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000 // 10 секунд таймаут
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Сервер ответил с ошибкой
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Запрос был отправлен, но нет ответа
      console.error('No response received:', error.request);
      return Promise.reject(new Error('Сервер не отвечает'));
    } else {
      // Ошибка при настройке запроса
      console.error('Request error:', error.message);
      return Promise.reject(error);
    }
  }
);

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  // Можно добавить дополнительные поля для регистрации
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

export default api; 