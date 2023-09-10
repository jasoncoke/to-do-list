const key = 'username'

export function setName(name: string) {
  localStorage.setItem(key, name)
}

export function getName(): string {
  return localStorage.getItem(key) || ''
}
