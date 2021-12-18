const formatHours = (value) => {
  let time = parseInt(value) || 0;
  return time.toString();
};

export default formatHours;
