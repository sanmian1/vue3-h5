<template>
  <nut-cell class="list-container">
    <nut-list
      :height="itemHeight"
      :listData="listData"
      @scroll-bottom="loadMore"
    >
      <template v-slot="{ item, index }">
        <div class="list-item">
            <ul>
                <li>
                    <div class="list-item-left">
                        <div class="list-item-left-level">
                            <span>一级需求{{item}}</span>
                        </div>
                        <span>政务侧联合服务{{index}}</span>
                    </div>
                    <div class="list-item-right">需求评估</div>
                </li>
                <li>
                    <span>提出时间：20250111</span>
                </li>
            </ul>
          </div>
      </template>
    </nut-list>
  </nut-cell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 定义 props
const props = defineProps({
  itemHeight: {
    type: Number,
    default: 50,
  },
  initialData: {
    type: Array,
    default: () => [],
  },
  loadMoreData: {
    type: Function,
    required: true,
  },
});

// 列表数据
const listData = ref<number[]>([]);

// 是否没有更多数据
const noMore = ref(false);

// 加载更多数据
const loadMore = async () => {
  if (noMore.value) return;

  try {
    const newData = await props.loadMoreData(listData.value.length);
    if (newData.length === 0) {
      noMore.value = true; // 没有更多数据
    } else {
      listData.value = [...listData.value, ...newData]; // 追加新数据
    }
  } catch (error) {
    console.error('加载更多数据失败:', error);
  }
};

// 初始化加载数据
onMounted(() => {
  listData.value = [...props.initialData];
});
</script>

<style scoped lang='scss'>
.list-container {
  flex: 1;
  overflow-y: auto; 
}

.list-item {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: #f2f2f2;
  box-sizing: border-box;
  margin-bottom: 10px;
  ul{
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .list-item-left{
        display: flex;
        align-items: center;
        .list-item-left-level{
          background: red;
          font-size: 14px;
          color:#fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          margin-right: 10px;
          padding: 5px 10px;
        }
      }
      .list-item-right{
        span{
          color: #78b7df;
        }
      }
    }
  }
  
}
</style>