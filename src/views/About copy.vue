<template>
  <div class="container">
    <!-- 固定头部 -->
    <div class="header">
      我是头部
    </div>

    <!-- 列表区域 -->
    <nut-cell class="list-container">
      <nut-list
        :height="itemHeight"
        :listData="listData"
        @scroll-bottom="loadMore"
      >
        <template v-slot="{ item, index }">
          <div class="list-item">
            {{ item }}
          </div>
        </template>
      </nut-list>
    </nut-cell>

    <!-- 加载状态提示 -->
    <div v-if="noMore" class="no-more">没有更多了</div>

    <!-- 固定底部 -->
    <div class="footer">
      我是底部
    </div>

    <!-- 全局 loading 遮罩层 -->
    <div v-if="loading" class="loading-mask">
      <nut-loading>加载中...</nut-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '../utils/axios'; // 引入封装的 axios 实例
import { useLoading } from '../utils/useLoading'; // 引入封装的 useLoading

// 列表项高度
const itemHeight = 50;

// 列表数据
const listData = ref<number[]>([]);

// 是否没有更多数据
const noMore = ref(false);

// 使用封装的 useLoading
const { loading } = useLoading();

// 模拟初始数据加载
const loadInitialData = async () => {
  try {
    const response = await axios.get('/initial-data'); // 使用封装的 axios 实例
    listData.value = response.data;
  } catch (error) {
    console.error('加载数据失败:', error);
  }
};

// 模拟加载更多数据
const loadMoreData = async () => {
  try {
    const response = await axios.get('/more-data', {
      params: { offset: listData.value.length },
    });
    const newData = response.data;
    if (newData.length === 0) {
      noMore.value = true; // 没有更多数据
    } else {
      listData.value = [...listData.value, ...newData]; // 追加新数据
    }
  } catch (error) {
    console.error('加载更多数据失败:', error);
  }
};

// 上拉加载更多
const loadMore = async () => {
  if (loading.value || noMore.value) return;
  await loadMoreData();
};

// 初始化加载数据
onMounted(() => {
  loadInitialData();
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.list-container {
  flex: 1;
  overflow-y: auto; // 允许列表区域滚动
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: #f4a8b6;
  border-radius: 10px;
}

.no-more {
  text-align: center;
  padding: 10px;
  color: #999;
}

.footer {
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #ddd;
}

.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>