/**
 * @deprecated
 */
export const checkStorageAvailability = (
  type: "localStorage" | "sessionStorage"
) => {
  let isAvailable = false;
  let reason = "";
  let storage = null;

  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    isAvailable = true;
  } catch (e) {
    // ref: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
    if (e instanceof DOMException) {
      isAvailable = false;
      if (e.code === 22) {
        reason = "error code - 22";
      } else if (e.code === 1014) {
        reason = "error code - 1014";
      } else if (e.name === "QuotaExceededError") {
        reason = "error name - QuotaExceededError";
      } else if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
        reason = "error name - NS_ERROR_DOM_QUOTA_REACHED";
      }
    }
  }
  return [isAvailable, reason];
};

/**
 * @deprecated
 */
export const checkedLocalStorage = {
  getItem: <T,>(key: string, defaultValue: T) => {
    const jsonValue = localStorage.getItem(key);

    try {
      if (jsonValue) return JSON.parse(jsonValue);
    } catch (error: any) {
      alert(`There is a problem with the storage space. ${error.message}`);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  },
  setItem: <T,>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
} as const;

export const checkedSessionStorage = {
  getItem: <T,>(key: string, defaultValue: T) => {
    const jsonValue = sessionStorage.getItem(key);

    try {
      if (jsonValue) return JSON.parse(jsonValue);
    } catch (error: any) {
      alert(`There is a problem with the storage space. ${error.message}`);
      sessionStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  },
  setItem: <T,>(key: string, value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
} as const;

/**
 * @deprecated
 */
export type CheckedLocalStorageType = typeof checkedLocalStorage;

/**
 * @deprecated
 */
export type CheckedSessionStorageType = typeof checkedSessionStorage;
