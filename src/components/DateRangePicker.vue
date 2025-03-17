<template>
  <div class="time-range-picker">
    <!-- 按钮组 -->
    <div class="button-group">
      <nut-button
        type="primary"
        size="small"
        @click="setTimeRange('week')"
      >
        最近1周
      </nut-button>
      <nut-button
        type="primary"
        size="small"
        @click="setTimeRange('month')"
      >
        最近1个月
      </nut-button>
      <nut-button
        type="primary"
        size="small"
        @click="setTimeRange('3months')"
      >
        最近3个月
      </nut-button>
      <nut-button
        type="primary"
        size="small"
        @click="setTimeRange('year')"
      >
        最近1年
      </nut-button>
    </div>

    <!-- 开始时间 -->
    <nut-cell
      :title="'开始时间'"
      :desc="startTime || '请选择时间'"
      @click="handleStartClick"
    ></nut-cell>

    <!-- 结束时间 -->
    <nut-cell
      :title="'结束时间'"
      :desc="endTime || '请选择时间'"
      @click="handleEndClick"
    ></nut-cell>

    <!-- 开始时间选择器 -->
    <nut-datepicker
      v-model:visible="showStartPicker"
      v-model="startDate"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleStartConfirm"
    ></nut-datepicker>

    <!-- 结束时间选择器 -->
    <nut-datepicker
      v-model:visible="showEndPicker"
      v-model="endDate"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleEndConfirm"
    ></nut-datepicker>

    <!-- 输出数据 -->
    <div v-if="outputData" class="output-data">
      <pre>{{ outputData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { Toast } from '@nutui/nutui';

// 最小日期和最大日期范围
const minDate = new Date(2020, 0, 1); // 2020-01-01
const maxDate = new Date(2025, 2, 10); // 2025-03-10

// 开始时间和结束时间
const startTime = ref<string>('');
const endTime = ref<string>('');

// 开始日期和结束日期
const startDate = ref<Date>();
const endDate = ref<Date>();

// 控制日期选择器的显示
const showStartPicker = ref(false);
const showEndPicker = ref(false);

// 当前操作的目标（start 或 end）
const currentTarget = ref<'start' | 'end'>('start');

// 输出数据
const outputData = ref<{ start: string; end: string } | null>(null);

// 点击开始时间
const handleStartClick = () => {
  currentTarget.value = 'start';
  showStartPicker.value = true;
};

// 点击结束时间
const handleEndClick = () => {
  currentTarget.value = 'end';
  showEndPicker.value = true;
};

// 确认开始时间
const handleStartConfirm = ({ selectedValue }) => {
  const selectedDate = new Date(selectedValue);
  startDate.value = selectedDate;
  startTime.value = dayjs(selectedDate).format('YYYY-MM-DD');

  // 校验开始时间是否大于结束时间
  if (endDate.value && startDate.value > endDate.value) {
    endTime.value = '';
    endDate.value = undefined;
  }

  // 输出数据
  updateOutputData();
};

// 确认结束时间
const handleEndConfirm = ({ selectedValue }) => {
  const selectedDate = new Date(selectedValue);
  endDate.value = selectedDate;
  endTime.value = dayjs(selectedDate).format('YYYY-MM-DD');

  // 校验结束时间是否小于开始时间
  if (startDate.value && endDate.value < startDate.value) {
    startTime.value = '';
    startDate.value = undefined;
  }

  // 输出数据
  updateOutputData();
};

// 设置时间范围
const setTimeRange = (range: string) => {
  const now = dayjs();
  let newDate: Date;

  // 根据范围计算新的时间（往前推时间）
  switch (range) {
    case 'week':
      newDate = now.subtract(1, 'week').toDate();
      break;
    case 'month':
      newDate = now.subtract(1, 'month').toDate();
      break;
    case '3months':
      newDate = now.subtract(3, 'month').toDate();
      break;
    case 'year':
      newDate = now.subtract(1, 'year').toDate();
      break;
    default:
      newDate = now.toDate();
  }

  // 检查时间范围是否超出限制
  if (newDate < minDate || newDate > maxDate) {
    Toast.fail('时间范围超出限制');
    return;
  }

  // 设置开始时间或结束时间
  if (currentTarget.value === 'start') {
    startDate.value = newDate;
    startTime.value = dayjs(newDate).format('YYYY-MM-DD');
  } else {
    endDate.value = newDate;
    endTime.value = dayjs(newDate).format('YYYY-MM-DD');
  }

  // 输出数据
  updateOutputData();
};

// 更新输出数据
const updateOutputData = () => {
  if (startTime.value && endTime.value && startDate.value && endDate.value && startDate.value <= endDate.value) {
    outputData.value = {
      start: startTime.value,
      end: endTime.value,
    };
  } else {
    outputData.value = null;
  }
};
</script>

<style scoped>
.time-range-picker {
  padding: 10px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.output-data {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>