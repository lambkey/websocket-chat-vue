<!-- 选择聊天对象 -->
<template>
  <div class="select-chat-object">
    <div class="search-box">
      <el-input placeholder="搜索联系人" prefix-icon="Search" />
    </div>
    <div class="contact-list">
      <div class="contact-item" v-for="i in 10" :key="i">
        <div class="avatar">
          <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
        <div class="contact-info">
          <div class="name">联系人 {{ i }}</div>
          <div class="last-message">最后一条消息...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.select-chat-object {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: none;
  background-color: #f9fafc;
}

.search-box {
  padding: 16px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-input) {
  :deep(.el-input__wrapper) {
    border-radius: 20px;
    box-shadow: 0 0 0 1px #dcdfe6 !important;
    padding: 0 15px;
    transition: all 0.3s;
    background-color: #fff;

    &:hover {
      box-shadow: 0 0 0 1px #409eff !important;
    }
  }

  :deep(.el-input__inner) {
    height: 36px;
    font-size: 14px;

    &::placeholder {
      color: #909399;
    }
  }
}

.contact-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.contact-item {
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  margin: 0 8px;

  &:hover {
    background-color: #f0f2f5;
  }

  &.active {
    background-color: #e6f6ff;
  }
}

.contact-info {
  flex: 1;
  min-width: 0; // 防止文本溢出
}

.name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.last-message {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>