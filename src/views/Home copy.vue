<template>
  <div>
    <h1>流程状态检查</h1>
    <div v-if="firstStepCompleted">
      <p>第一步已完成，进入第二步判断逻辑。</p>
      <div v-if="!secondStepExists">
        <p style="color: red;">请先签订方案合同。</p>
      </div>
      <div v-else-if="secondStepCompleted">
        <p>第二步已完成，进入第三步逻辑。</p>
        <!-- 这里可以继续第三步逻辑 -->
      </div>
      <div v-else>
        <p>签订方案合同存在，但状态未完成。</p>
      </div>
    </div>
    <div v-else>
      <p style="color: red;">第一步未完成，无法继续。</p>
    </div>

    <h2>当前流程状态</h2>
    <ul>
      <li v-for="(item, index) in ceshi" :key="index">
        {{ item.name }} - 状态: {{ item.status }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 流程数据
const ceshi = ref([
  { name: '方案合同答复', status: '1' },
  { name: '签订方案合同', status: '2' },
  { name: '客户预约接电', status: '2' },
  { name: '电子化转交', status: '2' },
  { name: '客户资产移交', status: '2' },
  { name: '电房验收', status: '2' },
  { name: '设计审查', status: '2' },
  { name: '负电流程', status: '2' },
  { name: '竣工接电', status: '2' },
  { name: '计量装表', status: '2' },
  { name: '复位归档', status: '2' },
  { name: '业务受理答复', status: '2' },
]);

// 第一步：检查 name === '业务受理答复' 且 status === '2'
const firstStepCompleted = computed(() => {
  return ceshi.value.some(item => item.name === '业务受理答复' && item.status === '2');
});

// 第二步：检查是否存在 name === '签订方案合同'
const secondStepExists = computed(() => {
  return ceshi.value.some(item => item.name === '签订方案合同');
});

// 第二步：检查 name === '签订方案合同' 且 status === '2'
const secondStepCompleted = computed(() => {
  return ceshi.value.some(item => item.name === '签订方案合同' && item.status === '2');
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