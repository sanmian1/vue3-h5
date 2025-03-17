<template>
  <div>
    <!-- <DateRangePicker @change="handleDateRangeChange" /> -->
    <div v-for="(item, index) in datalist" :key="index" class="item">
      <div>
        <div class="name">{{ item.label }}</div>
        <div v-for="(child, childIndex) in item.children" :key="childIndex" class="status">
          {{ child.name }}
          <span :class="`status-${child.status}`">{{ child.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DateRangePicker from '../components/DateRangePicker.vue';
const ceshi = [
  {
    name:'方案合同答复',
    status: '1',
  },
  {
    name:'签订方案合同',
    status: '2',
  },
  {
    name:'客户预约接电',
    status: '2',
  },
  {
    name:'电子化转交',
    status: '2',
  },
  {
    name:'客户资产移交',
    status: '2',
  },
  {
    name:'电房验收',
    status: '2',
  },
  {
    name:'设计审查',
    status: '2',
  },
  {
    name:'负电流程',
    status: '2',
  },
  {
    name:'竣工接电',
    status: '2',
  },
  {
    name:'计量装表',
    status: '2',
  },
  {
    name:'复位归档',
    status: '2',
  },
   {
    name:'业务受理答复',
    status: '2',
  },
]
const datalist = ref([
  {
    label:'业务受理',
    show: true,
    children: []
  },
  {
    label:'答复签约',
    show: true,
    children: []
  },
  {
    label:'竣工接电',
    show: true,
    children: []
  },
]);


onMounted(() => {
  setChangeList();
})

const handleDateRangeChange = (range) => {
  console.log('Selected Date Range:', range);
};

const setChangeList = () => {
  const newList = JSON.parse(JSON.stringify(ceshi));
  console.log('新数据++++++++++', newList)
  newList.forEach((item, index) => {
    if(index===0){
      console.log('进入第一步')
    }
    if(item.name==='业务受理答复' && item.status === '2'){
      console.log('进入第二步')
    }

    1.数组对象中name==='业务受理答复'且status==='2'输出为第一步，且进入第二步判断逻辑；
    2.如果数组中不存在name==='签订方案合同'的对象，则提示“请先签订方案合同”；
    3.如果数组中存在name==='签订方案合同'的对象且status==='2'，则说明第二步走了，进入第三步逻辑
  })
}

</script>
<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.name {
  font-size: 16px;
  font-weight: bold;
}

.status {
  font-size: 14px;
  color: #999;
}

.status-1 {
  color: red;
}

.status-2 {
  color: green;
}

.status-3 {
  color: blue;
}
</style>