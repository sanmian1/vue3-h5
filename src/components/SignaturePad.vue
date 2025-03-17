<template>
  <div class="signature-container">
    <canvas ref="signatureCanvas" class="signature-canvas"></canvas>
    <div class="button-group">
      <button @click="clearSignature">清除</button>
      <button @click="saveSignature">保存</button>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';
import html2canvas from 'html2canvas';

export default {
  name: 'SignaturePad',
  data() {
    return {
      signaturePad: null,
      isLandscape: false,
    };
  },
  mounted() {
    this.initSignaturePad();
    this.lockOrientation();
  },
  methods: {
    initSignaturePad() {
      const canvas = this.$refs.signatureCanvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight-100;
      this.signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
      });
    },
    clearSignature() {
      this.signaturePad.clear();
    },
    async saveSignature() {
      const canvas = this.$refs.signatureCanvas;
      const image = await html2canvas(canvas);
      const imageData = image.toDataURL('image/png');
      this.$emit('save', imageData);
      this.resetOrientation();
    },
    lockOrientation() {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').then(() => {
          this.isLandscape = true;
        }).catch((error) => {
          console.error('Orientation lock failed: ', error);
        });
      }
    },
    resetOrientation() {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
        this.isLandscape = false;
      }
    },
  },
};
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
}

.button-group {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>