<!-- 聊天输入框 -->
<template>
  <div class="input-frame" v-if="currentUserId">
    <div class="toolbar">
      <el-button-group>
        <el-button icon="Picture" text />
        <el-button icon="Folder" text />
        <el-button icon="Share" text />
      </el-button-group>
    </div>
    <div class="input-area">
      <el-input
        v-model="messageText"
        type="textarea"
        :rows="4"
        placeholder="请输入消息..."
        resize="none"
        @keyup.enter.ctrl="handleSend"
      />
    </div>
    <div class="actions">
      <el-button 
        type="primary" 
        size="large" 
        :icon="Position"
        @click="handleSend"
        :disabled="!messageText.trim()"
      >
        发送消息
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Position } from '@element-plus/icons-vue'
import axios from 'axios'
import { emitter } from '@/utils/emitter';

const messageText = ref('')

let currentUserId = ref<number>();

const handleSend = () => {
  if (!messageText.value.trim()) return
  
  // TODO: 实现发送消息逻辑
  axios.post('/message/send', {
    toId: currentUserId.value,
    content: messageText.value,
    // 其他必要的参数，如接收者ID等
  }).then(response => {
    console.log('消息发送成功:', response.data)
  }).catch(error => {
    console.error('消息发送失败:', error)
  })

  messageText.value = '' // 发送后清空输入框
}

onMounted(() => {
  // 定义一个获取当前聊天对象ID的函数
  emitter.on('setChatWithUserId', (userId: any) => {
    currentUserId.value = userId;
  });
})

onUnmounted(() => {
  emitter.off('setChatWithUserId');
});

</script>

<style scoped>
.input-frame {
  height: 350px; /* 增加高度 */
  border: 1px solid #ebeef5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.toolbar {
  padding: 8px 12px;
  border-bottom: 1px solid #ebeef5;
  background-color: #fafafa;
}

.input-area {

  padding: 12px;
  
  :deep(.el-textarea__inner) {

    resize: none;
    border: none;
    padding: 0;
    
    &:focus {
      box-shadow: none;
    }
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
  border-top: 1px solid #ebeef5;
  background-color: #fafafa;
  
  :deep(.el-button) {
    padding: 12px 24px;
    font-size: 14px;
    
    .el-icon {
      margin-right: 8px;
    }
  }
}

:deep(.el-textarea__inner) {
  height: 100% !important;
  resize: none;
}

/* 美化滚动条样式 */
:deep(*::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(*::-webkit-scrollbar-thumb) {
  background: #cfd3d9;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background: #a6adb8;
  }
}

:deep(*::-webkit-scrollbar-track) {
  background: transparent;
}

/* Firefox滚动条 */
* {
  scrollbar-width: thin;
  scrollbar-color: #cfd3d9 transparent;
}
</style>