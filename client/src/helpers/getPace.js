const getPace = (hours, minutes, seconds, distance) => {
  const total =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  const pace = total / parseFloat(distance.replace(',', '.'));

  const min = parseInt(pace / 60);

  const sec = Math.round(pace % 60);

  return min + "'" + (sec > 10 ? sec : '0' + sec) + '/km';
};

export default getPace;
