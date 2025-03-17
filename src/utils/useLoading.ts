import { ref } from 'vue';

// 封装一个全局 loading 状态管理
export function useLoading() {
  const loading = ref(false); // 是否正在加载
  let requestCount = 0; // 当前请求的数量

  // 显示 loading
  const showLoading = () => {
    if (requestCount === 0) {
      loading.value = true;
    }
    requestCount++;
  };

  // 隐藏 loading
  const hideLoading = () => {
    requestCount--;
    if (requestCount === 0) {
      loading.value = false;
    }
  };

  return {
    loading,
    showLoading,
    hideLoading,
  };
}