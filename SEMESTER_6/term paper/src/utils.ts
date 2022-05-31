export function toMinutes(time: string) {
  const [ hour, minute ] = time.split(':')
  return +hour * 60 + +minute
}

export function getTransoprtTime(googleTime: string, nowTime: string) {
  console.log('google', googleTime)
  console.log('nowapi', nowTime)
  
  return toMinutes(googleTime) - toMinutes(nowTime)
}