<!-- 消息记录框 -->
<template>
  <div class="message-record">
    <div class="message-list">
      <div v-for="i in 10" :key="i" :class="['message-item', i % 2 === 0 ? 'sent' : 'received']">
        <div class="message-content">
          <div class="avatar">
            <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <div class="bubble">
            这是一条测试消息 {{ i }}
          </div>
        </div>
        <div class="time">{{ new Date().toLocaleTimeString() }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

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