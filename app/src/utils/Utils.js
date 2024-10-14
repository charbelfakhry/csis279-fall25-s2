
const getToken = () => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    return parsedUser.token;
  };

const getTokenBearer = () => {
  const token = getToken();
  return `Bearer ${token}`;
}

module.exports = {
    getToken,
    getTokenBearer,
}