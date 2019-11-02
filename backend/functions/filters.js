const parsePostData = async (data) => {
  const parsedData = await data.json();
  if(parsedData.error) {
    throw new Error('not authorized');
  }
  if(!parsedData.data) {
    throw new Error('no data available');
  }
  // if data contains message property then it's a post.
  return parsedData.data.filter(post => post.message);
}

// within past X hours
// data = array of posts, expecting created_date prop
const filterPostsByHour = (data, hours) => {
  // timeStr must be of format [integer][time] such as 24h. only doing hours for now.
  const currentTime = new Date();
  const oldestTime = new Date();
  //quick validation
  if(typeof hours !== "number") {
    throw new Error('hours must be a number');
  }
  oldestTime.setHours(currentTime.getHours() - hours);
  return data.filter(post => {
    const postTime = new Date(post.created_time);
    return postTime >= oldestTime;
  });
};
module.exports = {parsePostData, filterPostsByHour}