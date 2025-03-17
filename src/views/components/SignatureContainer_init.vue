<template>
  <div class="signature-container">
    <!-- Canvas 画布 -->
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
      @touchcancel="stopDrawing"
    ></canvas>

    <!-- 按钮组 -->
    <div class="buttons">
      <button @click="clearCanvas">清除</button>
      <button @click="saveSignature">保存</button>
    </div>

    <!-- 图片预览 -->
    <div v-if="imageUrl" class="preview">
      <img :src="imageUrl" alt="签名预览" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null); // Canvas 元素
const ctx = ref(null); // Canvas 上下文
const isDrawing = ref(false); // 是否正在绘制
const imageUrl = ref(''); // 保存的图片 URL

// 初始化 Canvas
onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas); // 监听窗口大小变化
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
});

// 调整 Canvas 大小以铺满全屏
const resizeCanvas = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

// 开始绘制
const startDrawing = (event) => {
  event.preventDefault(); // 阻止默认行为
  isDrawing.value = true;
  const { offsetX, offsetY } = getEventPosition(event);
  ctx.value.beginPath();
  ctx.value.moveTo(offsetX, offsetY);
};

// 绘制中
const draw = (event) => {
  if (!isDrawing.value) return;
  event.preventDefault(); // 阻止默认行为
  const { offsetX, offsetY } = getEventPosition(event);
  ctx.value.lineTo(offsetX, offsetY);
  ctx.value.stroke();
};

// 结束绘制
const stopDrawing = () => {
  isDrawing.value = false;
  ctx.value.closePath();
};

// 清除画布
const clearCanvas = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  imageUrl.value = '';
};

// 保存签名
const saveSignature = () => {
  const dataUrl = canvas.value.toDataURL('image/png');
  imageUrl.value = dataUrl;
  console.log('签名已保存:', dataUrl);
  // 这里可以添加上传逻辑
};

// 获取事件位置（兼容鼠标和触摸事件）
const getEventPosition = (event) => {
  const rect = canvas.value.getBoundingClientRect();
  let offsetX, offsetY;

  if (event.touches) {
    // 触摸事件
    offsetX = event.touches[0].clientX - rect.left;
    offsetY = event.touches[0].clientY - rect.top;
  } else {
    // 鼠标事件
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
  }

  return { offsetX, offsetY };
};
</script>

<style scoped>
/* 容器铺满全屏 */
.signature-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* Canvas 铺满全屏 */
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  touch-action: none; /* 禁用默认的触摸行为 */
}

/* 按钮组 */
.buttons {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%); /* 垂直居中 */
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10; /* 确保按钮在 Canvas 之上 */
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* 图片预览 */
.preview {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.preview img {
  max-width: 150px;
  height: auto;
  display: block;
}
</style>