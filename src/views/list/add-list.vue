<template>
  <div>
    <a-modal :open="true" title="New List" @ok="handleOk">
      <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="Title"
        name="title"
      >
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item
        label="Content"
        name="content"
      >
        <a-input v-model:value="formState.content" />
      </a-form-item>
      <a-form-item
        label="Type"
        name="type"
      >
      <a-select v-model:value="formState.type">
        <a-select-option :value="1">toDo</a-select-option>
        <a-select-option :value="2">Bug</a-select-option>
        <a-select-option :value="3">Issue</a-select-option>
      </a-select>
      </a-form-item>
    </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { addList } from '@/api/list'
import { reactive } from 'vue'

interface formType {
  title?:string;
  content:string;
  type?:number;
  mark?:string;
  remind?:string;
}
const formState:formType = reactive({
  title: '123',
  content: '222',
  mark: '',
  remind: '',
  type: 1
})

const handleOk = async ():Promise<void> => {
  const { data } = await addList(formState)
  console.log(data)
}
</script>

<style scoped>

</style>
