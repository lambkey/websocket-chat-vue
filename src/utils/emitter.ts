import mitt from "mitt";

const emitter = mitt()

// // 绑定事件
// emitter.on('事件-xxx',(params)=>{
//     console.log('xxx',params)
// })
// // 触发事件
// emitter.emit('事件-xxx','参数')

// // 解除某个事件
// emitter.off('事件-xxx')

// // 解除所有事件
// emitter.all.clear()

export{
    emitter
}