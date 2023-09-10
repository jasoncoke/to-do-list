<template>
  <div>
    <a-modal :open="true" title="设置一个名字吧" @ok="handleOk">
      <a-input v-model:value="name" placeholder="请输入" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { setName } from '@/utils/auth'
import { message } from 'ant-design-vue'

const emits = defineEmits<{(event: 'close'): void
}>()

const name = ref<string>('')
const handleOk = () => {
  const username:string = name.value.trim()
  setName(username)
  message.success('username 设置成功！')
  emits('close')
}

</script>

<style scoped>

</style>
