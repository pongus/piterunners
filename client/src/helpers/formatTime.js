const formatTime = (hours, minutes, seconds) => {
  return hours === '99' ? 'DNF' : `${hours}:${minutes}:${seconds}`;
};

export default formatTime;
