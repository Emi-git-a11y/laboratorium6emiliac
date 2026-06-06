import dayjs from 'dayjs'

export function differenceInDays(date_inp){
  return dayjs().diff(dayjs(date_inp),"day")
}

export function ifBirthday(date_inp){
  return dayjs().format("DD-MM")==dayjs(date_inp).format("DD-MM");
}

export function differenceInWeeks(date_inp){
  return dayjs(date_inp).diff(dayjs(),"week");
}

export async function displayArticles(){
  const result = await fetch('https://jtpolkcgjrsfmwbuefyr.supabase.co/rest/v1/');
  const records = await result.json();
  return records
}
 