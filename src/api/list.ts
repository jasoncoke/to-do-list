import request from '@/utils/request'

interface listParams {
  title?: string;
  content: string;
  type?: number;
  mark?: string;
  remind?: string;
}

export function addList(data: listParams) {
  return request({
    url: '/api/to-do/add',
    method: 'post',
    data
  })
}
