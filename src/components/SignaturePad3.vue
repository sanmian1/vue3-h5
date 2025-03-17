<template>
  <div :class="['signature-container', { 'rotate-container': isPortrait }]">
    <canvas ref="canvas"></canvas>
    <div class="button-group">
      <button @click="saveSignature">保存签名</button>
      <button @click="clearCanvas">清除</button>
    </div>
    <div v-if="isPortrait" class="orientation-warning">
      请将设备旋转到横屏模式以获得最佳体验
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx = null;
let drawing = false;
let points = [];
const isPortrait = ref(false);

// 开始绘制
const startDrawing = (event) => {
  event.preventDefault(); // 阻止默认行为
  drawing = true;
  points = [];
  const touch = event.touches[0];
  const rect = canvas.value.getBoundingClientRect();
  points.push({
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  });
};

// 绘制中
const draw = (event) => {
  event.preventDefault(); // 阻止默认行为
  if (!drawing) return;
  const touch = event.touches[0];
  const rect = canvas.value.getBoundingClientRect();
  const newPoint = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
  points.push(newPoint);

  if (points.length >= 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    points = [newPoint];
  }
};

// 结束绘制
const stopDrawing = () => {
  drawing = false;
  points = [];
};

// 清除画布
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

// 判断画布是否为空
const isCanvasEmpty = () => {
  const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data;
  return imageData.every((value) => value === 0); // 检查所有像素是否透明
};

// 保存签名
const saveSignature = () => {
  if (isCanvasEmpty()) {
    alert('请先签名');
    return;
  }
  const dataURL = canvas.value.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'signature.png';
  link.click();
};

// 检测屏幕方向
const checkOrientation = () => {
  isPortrait.value = window.matchMedia("(orientation: portrait)").matches;
};

// 初始化画布
const initCanvas = () => {
  const parent = canvas.value.parentElement;
  const dpr = window.devicePixelRatio || 1; // 设备像素比

  // 设置Canvas的实际像素大小
  canvas.value.width = parent.clientWidth * dpr;
  canvas.value.height = parent.clientHeight * dpr;

  // 设置Canvas的CSS大小
  canvas.value.style.width = `${parent.clientWidth}px`;
  canvas.value.style.height = `${parent.clientHeight}px`;

  // 获取2D上下文并缩放
  ctx = canvas.value.getContext('2d');
  ctx.scale(dpr, dpr); // 根据设备像素比缩放

  // 设置绘制样式
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
};

// 绑定触摸事件
const bindEvents = () => {
  canvas.value.addEventListener('touchstart', startDrawing);
  canvas.value.addEventListener('touchmove', draw);
  canvas.value.addEventListener('touchend', stopDrawing);
};

// 解绑触摸事件
const unbindEvents = () => {
  canvas.value.removeEventListener('touchstart', startDrawing);
  canvas.value.removeEventListener('touchmove', draw);
  canvas.value.removeEventListener('touchend', stopDrawing);
};

onMounted(() => {
  initCanvas();
  bindEvents();
  checkOrientation();
  window.addEventListener('orientationchange', checkOrientation);
  window.addEventListener('resize', initCanvas); // 监听窗口大小变化
});

onUnmounted(() => {
  unbindEvents();
  window.removeEventListener('orientationchange', checkOrientation);
  window.removeEventListener('resize', initCanvas);
});
</script>

<style scoped lang="scss">
.signature-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;

  canvas {
    border: 1px solid #000;
    background-color: #fff;
    touch-action: none;
    width: 100%; // CSS宽度
    height: 80%; // CSS高度
  }

  .button-group {
    margin-top: 20px;
    display: flex;
    gap: 10px;

    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .orientation-warning {
    margin-top: 20px;
    font-size: 18px;
    color: #ff0000;
  }
}

.rotate-container {
  transform: rotate(90deg);
  transform-origin: center center;
  width: 100vh;
  height: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}
</style>