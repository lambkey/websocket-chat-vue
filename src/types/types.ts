// 聊天消息记录
interface Message {
  id: number;
  fromId: number;
  toId: number;
  content: string;
  createdTime: string;
}

export { type Message };