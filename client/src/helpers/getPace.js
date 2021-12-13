const getPace = (h, m, s, d) => {
  const total = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
  const pace = total / parseFloat(d.replace(',', '.'));
  const min = parseInt(pace / 60);
  const sec = Math.round(pace % 60);

  return min + "'" + (sec > 10 ? sec : '0' + sec) + '/km';
};

export default getPace;
