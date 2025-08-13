<template>
  <div class="chat-with">
    <div class="user-info" v-show="currentUserName">
      <span class="name">{{ currentUserName }}</span>
      <span class="status">在线</span>
    </div>
    <div class="actions">
      <el-button-group>
        <el-button icon="VideoCamera" text />
        <el-button icon="Phone" text />
        <el-button icon="More" text />
      </el-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emitter } from '@/utils/emitter';
import { onMounted, onUnmounted, ref } from 'vue';

// 定义一个获取当前聊天对象名称
let currentUserName = ref<string>(); // 默认值

onMounted(()=>{
  emitter.on('setChatWithUserName', (userName: any) => {
    currentUserName.value = userName;
  });
})

onUnmounted(() => {
  emitter.off('setChatWithUserName');
});

</script>

<style scoped>
.chat-with {
  height: 100%;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-size: 16px;
  font-weight: 500;
}

.status {
  font-size: 12px;
  color: #67c23a;
}
</style>