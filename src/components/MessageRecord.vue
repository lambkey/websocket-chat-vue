<!-- 消息记录框 -->
<template>
  <div class="message-record" ref="messageContainer">
    <div class="message-list" v-if="messages.data.records.length">
      <div v-for="message in messages.data.records" :key="message.id" :class="['message-item',message.toId  === currentUserId ? 'received' : 'sent']">
        <div class="message-content">
          <div class="avatar">
            <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <div class="bubble">
            {{ message.content }}
          </div>
        </div>
        <div class="time">{{ message.createdTime }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { emitter } from '@/utils/emitter';
import { onMounted, onUnmounted, reactive, ref, nextTick } from 'vue';
import { type Message } from '@/types/types';

let messages = reactive({
  data: {
    records: [] as Message[]
  }
})
let currentUserId = ref<number>();
const messageContainer = ref<HTMLElement | null>(null);

// 格式化日期 YYYY-MM-DD HH:mm:SS
let dateFormat = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
}

// 滚动到底部的方法
const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

onMounted(()=>{
  // 绑定一个事件，点击联系人时获取消息列表
  emitter.on('newMessage', (data:any) => {
    // 这里可以添加逻辑来更新消息列表
    messages.data.records = data.resultPage.records;
    currentUserId.value = data.currentUser;

    // 同时通知输入框当前聊天对象ID
    emitter.emit('setChatWithUserId', data.chatWithUser);
    scrollToBottom(); // 加载新消息列表后滚动
  });

  // 绑定一个事件，消息更新更新消息列表
  emitter.on('messageUpdate', (data:any) => {

    let {content,createdTime,fromId,id,toId} = data;
    createdTime = dateFormat(createdTime);
    messages.data.records.push({
      content,
      createdTime,
      fromId,
      id,
      toId
    });
    scrollToBottom(); // 新消息到达后滚动
    console.log('消息更新:', data);
  })
})

onUnmounted(()=>{
    emitter.off('newMessage')
    emitter.off('messageUpdate')
  })

</script>

<style scoped>
.message-record {
  height: 100%;
  border: none;
  width: 100%;
  overflow-y: auto;
  padding: 20px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message-item.sent {
  align-self: flex-end;
}

.message-item.received {
  align-self: flex-start;
}

.message-content {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.sent .message-content {
  flex-direction: row-reverse;
}

.bubble {
  padding: 10px 16px;
  background: #e6f6ff;
  border-radius: 16px;
  position: relative;
  word-break: break-word;
}

.sent .bubble {
  background: #1989fa;
  color: white;
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  padding: 0 40px;
}
</style>