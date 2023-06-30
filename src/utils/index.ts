const formatDate = (props:string):string => {
  if (props === '') return ''
  const date = new Date(props)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

export {
  formatDate
}
