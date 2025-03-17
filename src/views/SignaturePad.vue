<template>
  <div class="signature-content">
    <div class="signature-content-open" v-if="!showSignaturePad">
      <button @click="showSignaturePad = true">打开签名板</button>
    </div>
     <SignaturePad @save="handleSave"  v-if="showSignaturePad"/>
    <div class="show-signature-img" v-if="signatureImage" >
        <img class="img-signature" :src="signatureImage" alt="签名" />
        <span>{{currentTimte}}</span>
    </div>
  </div>
   <!-- <div class="signature-content-pad" v-if="showSignaturePad">
        <SignaturePad @save="handleSave"  v-if="showSignaturePad"/>
    </div> -->
</template>

<script setup>
import { ref } from 'vue';
// import SignaturePad from '../components/SignaturePad.vue';
// import SignaturePad from '../components/SignaturePad2.vue';
import SignaturePad from '../components/SignaturePad3.vue';
import dayjs from 'dayjs';
const now = dayjs();
console.log(now); // 输出当前时间的 Day.js 对象

const currentTimte = ref(now.format('YYYY-MM-DD HH:mm:ss'));
const showSignaturePad = ref(false);
const signatureImage = ref(null);

const handleSave = (imageData) => {
    console.log('imageData+++++++',imageData)
  showSignaturePad.value = false;
  signatureImage.value = imageData;
};
</script>

<style scoped lang="scss">
.signature-content{
    width: 100vw;
    .show-signature-img{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .img-signature{
            width: 100px;
            height: 50px;
            margin-bottom: 10px;
        }
        span{
            font-size: 16px;
            color: #000;
        }
    }
    
}
.signature-content-pad{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    background: pink;
}
</style>