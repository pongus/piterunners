const formatMinutesAndSeconds = (value) => {
  let time = parseInt(value) || 0;
  time = time <= 59 ? time : 0;
  time = time >= 10 ? time : '0' + time;
  return time.toString();
};

export default formatMinutesAndSeconds;
