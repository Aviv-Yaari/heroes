let debounceTimer: number;

const debounce = (callback: Function, time: number) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

export const utilService = { debounce };
