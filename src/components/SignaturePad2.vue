<template>
  <div class="signature-container">
    <!-- 签名画布 -->
    <canvas
      ref="signatureCanvas"
      class="signature-canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
    ></canvas>
    <!-- 操作按钮 -->
    <div class="button-group">
      <button @click="clearCanvas">清除</button>
      <button @click="saveCanvas">保存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 画布和上下文
const signatureCanvas = ref(null);
const ctx = ref(null);

// 绘制状态
const isDrawing = ref(false);
const lastX = ref(0);
const lastY = ref(0);

// 初始化画布
const initCanvas = () => {
  const canvas = signatureCanvas.value;
  ctx.value = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
};

// 调整画布大小
const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  const rect = signatureCanvas.value.getBoundingClientRect();
  signatureCanvas.value.width = rect.width * dpr;
  signatureCanvas.value.height = rect.height * dpr;
  ctx.value.scale(dpr, dpr);
};

// 开始绘制
const startDrawing = (event) => {
  isDrawing.value = true;
  const { offsetX, offsetY } = getEventPosition(event);
  lastX.value = offsetX;
  lastY.value = offsetY;
};

// 绘制
const draw = (event) => {
  if (!isDrawing.value) return;
  const { offsetX, offsetY } = getEventPosition(event);
  ctx.value.beginPath();
  ctx.value.moveTo(lastX.value, lastY.value);
  ctx.value.lineTo(offsetX, offsetY);
  ctx.value.strokeStyle = '#000';
  ctx.value.lineWidth = 2;
  ctx.value.stroke();
  lastX.value = offsetX;
  lastY.value = offsetY;
};

// 停止绘制
const stopDrawing = () => {
  isDrawing.value = false;
};

// 获取事件位置（兼容鼠标和触摸事件）
const getEventPosition = (event) => {
  const rect = signatureCanvas.value.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  if (event.touches) {
    return {
      offsetX: (event.touches[0].clientX - rect.left) * dpr,
      offsetY: (event.touches[0].clientY - rect.top) * dpr,
    };
  } else {
    return {
      offsetX: event.offsetX * dpr,
      offsetY: event.offsetY * dpr,
    };
  }
};

// 清除画布
const clearCanvas = () => {
  ctx.value.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
};

// 保存画布为图片
const saveCanvas = () => {
  const image = signatureCanvas.value.toDataURL('image/png');
  emit('save', image);
  resetOrientation();
};

// 锁定横屏
const lockOrientation = () => {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch((error) => {
      console.error('Orientation lock failed: ', error);
    });
  }
};

// 恢复竖屏
const resetOrientation = () => {
  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  }
};

// 监听屏幕方向变化
const handleOrientationChange = () => {
  if (screen.orientation && screen.orientation.type.includes('landscape')) {
    // 横屏模式下的布局调整
    document.querySelector('.button-group').style.flexDirection = 'row';
  } else {
    // 竖屏模式下的布局调整
    document.querySelector('.button-group').style.flexDirection = 'column';
  }
};

// 生命周期钩子
onMounted(() => {
  initCanvas();
  lockOrientation();
  window.addEventListener('orientationchange', handleOrientationChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('orientationchange', handleOrientationChange);
});

// 定义事件
const emit = defineEmits(['save']);
</script>

<style scoped>
.signature-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.signature-canvas {
  border: 1px solid #000;
  background-color: #fff;
  width: 100%;
  height: 80%;
}

.button-group {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>