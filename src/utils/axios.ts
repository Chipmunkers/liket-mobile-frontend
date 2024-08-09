import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

let isRefresh = false;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// * 로그인 하지 않아도 접속 가능한 API 목록
const canAccessApiPathWithoutLogin = ["/apis/culture-content/hot-style/all"];

axiosInstance.interceptors.request.use(async (config) => {
  const url = config.url;

  if (
    canAccessApiPathWithoutLogin.includes(url || "") &&
    !config.headers.Authorization
  ) {
    // * 이미 Refresh token을 발급중인 API가 있으면 대기
    if (isRefresh) {
      while (true) {
        await sleep(300);

        if (!isRefresh) break;
      }
      return config;
    }

    isRefresh = true;
    try {
      const { data } = await axios.post("/apis/auth/access-token");
      setAuthToken(data);

      config.headers.Authorization = `Bearer ${data}`;
    } catch (err) {
    } finally {
      isRefresh = false;
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  async (config) => {
    return config;
  },
  async (err: unknown) => {
    if (!(err instanceof AxiosError)) throw err;

    const originalRequest = err.config;

    if (!originalRequest) throw err;

    // * 401 에러가 발생한 경우
    if (err.response?.status === 401) {
      // * 이미 Refresh token을 발급중인 API가 있으면 대기
      if (isRefresh) {
        while (true) {
          await sleep(300);

          if (!isRefresh) break;
        }
        return axiosInstance.request(originalRequest);
      }

      isRefresh = true;
      try {
        const { data } = await axios.post("/apis/auth/access-token");
        setAuthToken(data);
      } catch (err) {
        throw err;
      } finally {
        isRefresh = false;
      }

      return axiosInstance.request(originalRequest);
    }

    throw err;
  }
);

export default axiosInstance;
