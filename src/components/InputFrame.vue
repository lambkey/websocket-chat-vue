<!-- 聊天输入框 -->
<template>
  <div class="input-frame">
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
import { ref } from 'vue'
import { Position } from '@element-plus/icons-vue'

const messageText = ref('')

const handleSend = () => {
  if (!messageText.value.trim()) return
  
  // TODO: 实现发送消息逻辑
  console.log('发送消息:', messageText.value)
  messageText.value = '' // 发送后清空输入框
}
</script>

<style scoped>
.input-frame {
  height: 280px; /* 增加高度 */
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
  flex: 1;
  padding: 12px;
  
  :deep(.el-textarea__inner) {
    height: 100%;
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