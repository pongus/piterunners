const getPace = (h, m, s, d, u) => {
  const time = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
  const distance = String(u === 'm' ? d / 1000 : d).replace(',', '.');
  const pace = time / distance;
  const min = parseInt(pace / 60);
  const sec = Math.round(pace % 60);

  return min + "'" + (sec > 10 ? sec : '0' + sec) + '/km';
};

export default getPace;
