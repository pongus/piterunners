const formatDistance = (distance, unit) => {
  return `${distance && distance.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${
    distance && unit
  }`;
};

export default formatDistance;
