<template>
  <div>
    <h1>流程步骤模拟</h1>

    <!-- 显示当前步骤 -->
    <template v-for="(step, index) in newList" :key="index">
      <div v-if="step.show">
        <h2>{{ step.label }}</h2>
        <ul>
          <li v-for="(child, childIndex) in step.children" :key="childIndex">
            {{ child.name }} - 状态: {{ child.status }}
          </li>
        </ul>
      </div>
    </template>

    <!-- 显示当前步骤状态 -->
    <p v-if="currentStep < newList.length - 1">当前步骤: {{ newList[currentStep].label }}</p>
    <p v-else>所有步骤已完成！</p>

    <!-- 错误提示 -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// 初始数据
const ceshi = ref([
  { name: '业务受理答复', status: '2' },
  { name: '方案合同答复', status: '1' },
]);

// 新数组集合
const newList = ref([
  {
    label: '业务受理',
    show: true,
    children: [],
  },
  {
    label: '答复签约',
    show: false,
    children: [],
  },
  {
    label: '竣工接电',
    show: false,
    children: [],
  },
]);

// 当前步骤索引
const currentStep = ref(0);

// 错误提示信息
const errorMessage = ref('');

// 初始化步骤数据
const initializeSteps = () => {
  // 第一步：业务受理
  newList.value[0].children = ceshi.value.filter(
    item => item.name === '业务受理答复'
  );

  // 第二步：答复签约
  newList.value[1].children = ceshi.value.filter(
    item => item.name === '方案合同答复' || item.name === '签订方案合同'
  );

  // 第三步：竣工接电
  newList.value[2].children = ceshi.value.filter(
    item =>
      item.name !== '业务受理答复' &&
      item.name !== '方案合同答复' &&
      item.name !== '签订方案合同'
  );
};

// 模拟接口加载数据
const loadData = (newItem) => {
  setTimeout(() => {
    ceshi.value.push(newItem);
    initializeSteps(); // 重新初始化步骤数据
  }, 1000); // 模拟异步请求
};

// 更新状态
const updateStatus = (item, newStatus) => {
  item.status = newStatus;

  // 根据状态变化动态加载新数据
  if (item.name === '方案合同答复' && newStatus === '2') {
    loadData({ name: '签订方案合同', status: '1' });
  } else if (item.name === '签订方案合同' && newStatus === '2') {
    loadData({ name: '客户预约接电', status: '1' });
    loadData({ name: '电子化转交', status: '1' });
    // 可以继续加载其他数据
  }
};

// 自动进入下一步
const autoNextStep = () => {
  if (currentStep.value === 0) {
    // 检查 '业务受理答复' 的状态是否为 '2'
    const businessAcceptance = ceshi.value.find(item => item.name === '业务受理答复');
    if (!businessAcceptance || businessAcceptance.status !== '2') {
      errorMessage.value = '业务受理答复的状态未完成，无法进入下一步！';
      return;
    }
  } else if (currentStep.value === 1) {
    // 检查 '签订方案合同' 是否存在且状态为 '2'
    const contractSigned = ceshi.value.find(item => item.name === '签订方案合同');
    if (!contractSigned || contractSigned.status !== '2') {
      errorMessage.value = '等待合同签订，无法进入下一步！';
      return;
    }
  }

  if (currentStep.value < newList.value.length - 1) {
    // 隐藏当前步骤
    newList.value[currentStep.value].show = false;
    // 进入下一步
    currentStep.value++;
    // 显示下一步
    newList.value[currentStep.value].show = true;
    // 清空错误提示
    errorMessage.value = '';
  }
};

// 监听 ceshi 数据变化，自动触发下一步
watch(
  () => ceshi.value,
  () => {
    autoNextStep();
  },
  { deep: true }
);

// 初始化
onMounted(() => {
  initializeSteps();

  // 模拟初始状态更新
  setTimeout(() => {
    const schemeReply = ceshi.value.find(item => item.name === '方案合同答复');
    if (schemeReply) {
      updateStatus(schemeReply, '2'); // 模拟 '方案合同答复' 状态更新
    }
  }, 2000); // 2 秒后更新状态
});
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
  padding: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}
</style>