<template>
  <div class="container">
    <!-- 固定头部 -->
    <div class="header">
      我是头部
    </div>

    <!-- 使用封装的列表组件 -->
    <ReusableList
      :itemHeight="100"
      :initialData="initialData"
      :loadMoreData="loadMoreData"
    />

    <!-- 加载状态提示 -->
    <div v-if="noMore" class="no-more">没有更多了</div>

    <!-- 固定底部 -->
    <div class="footer">
      <ul class="footer-btns">
        <li>新增需求</li>
        <li>批量签字确认</li>
        <li>需求催办</li>
      </ul>
      <div class="footer-tabs">我是底部tabs</div>
    </div>

    <!-- 全局 loading 遮罩层 -->
    <div v-if="loading" class="loading-mask">
      <nut-loading>加载中...</nut-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ReusableList from '../components/ReusableList.vue'; // 引入封装的列表组件

// 初始数据
const initialData = ref<number[]>(new Array(10).fill(0).map((_, index) => index + 1));

// 是否没有更多数据
const noMore = ref(false);

// 模拟加载更多数据
const loadMoreData = async (offset: number) => {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const newData = new Array(20).fill(0).map((_, index) => offset + index + 1);
      resolve(newData);
    }, 1000);
  });
};


</script>

<style scoped lang="scss">
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

.no-more {
  text-align: center;
  padding: 10px;
  color: #999;
}

.footer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  &-btns{
    width: 100%;
    display: flex;
    align-items: center;
    li{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0;
      border-right: 1px solid #ddd;
    }
    li:last-child{
      border-right: none;
    }
  }
  &-tabs{
    width: 100%;
    height: 60px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    border-top: 1px solid #ddd;
  }
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