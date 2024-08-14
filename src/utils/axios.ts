import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

let currentAccessToken = "";

export const setAuthToken = (token: string) => {
  currentAccessToken = token;
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
const canAccessApiPathWithoutLogin = [
  "/apis/culture-content/hot-style/all",
  "/apis/culture-content/hot-random-style/all",
  "/apis/culture-content/hot-age/all",
  "/apis/culture-content/soon-open/all",
  "/apis/culture-content/soon-end/all",
  /^\/apis\/culture-content\/\d+$/,
];

// * 로그인 하지 않아도 접근 가능한 API url인지를 검증하는 메서드
function isAccessUrlWithoutLogin(url?: string): boolean {
  if (!url) return false;

  const path = url.split("?")[0];

  for (const accessUrl of canAccessApiPathWithoutLogin) {
    if (new RegExp(accessUrl).test(path)) {
      return true;
    }
  }

  return false;
}

axiosInstance.interceptors.request.use(async (config) => {
  const url = config.url;

  if (isAccessUrlWithoutLogin(url) && !config.headers.Authorization) {
    // * 이미 Refresh token을 발급중인 API가 있으면 대기
    if (isRefresh) {
      while (true) {
        await sleep(300);

        if (!isRefresh) break;
      }
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
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
