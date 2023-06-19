const addZero = (num) => {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
};

const extractDateAndTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());
  const s = addZero(date.getSeconds());
  const time = h + ":" + m + ":" + s;

  return { date: formattedDate, time };
};

export default extractDateAndTime;
