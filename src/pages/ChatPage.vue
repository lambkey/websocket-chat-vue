<template>
    <div class="common-layout">
      <div class="chat-container">
        <el-container>
        <el-aside width="200px">

            <SelectChatObject />

        </el-aside>
        <el-container>
          <el-header height="40px">

            <ChatWith />
           

          </el-header>

          <el-main>
            <!-- 消息记录框 -->
            <MessageRecord />

          </el-main>

          <el-footer height="300px">
            <!-- 聊天输入框 -->
            <InputFrame />
          </el-footer>
        </el-container>
      </el-container>
      </div>
    </div>
  </template>
  

<script lang="ts" setup>
import SelectChatObject from '@/components/SelectChatObject.vue'    
import MessageRecord from '@/components/MessageRecord.vue'
import InputFrame from '@/components/InputFrame.vue'
import ChatWith from '@/components/ChatWith.vue'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  connectionWebsocket()
})

let connectionWebsocket = ()=>{
  // 通过websocket连接后端
  const ws = new WebSocket('ws://127.0.0.1:8888/websocket-chat-boot/chat')

  ws.onopen = () => {
    console.log('WebSocket连接已打开')
  }

  ws.onmessage = (event) => {
    console.log('收到消息:', event.data)
  }

  ws.onclose = () => {
    console.log('WebSocket连接已关闭')
  }

  ws.onerror = (error) => {
    console.error('WebSocket错误:', error)
  }
}


</script>

<style scoped>
.common-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.chat-container {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #f8f9fa;
  border-right: 1px solid #ebeef5;
  padding: 20px 0;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.el-main {
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
}

.el-footer {
  background-color: #fff;
  border-top: 1px solid #ebeef5;
  padding: 10px;
  height: 300px !important;
}

:deep(.el-container) {
  border-radius: 8px;
}
</style>