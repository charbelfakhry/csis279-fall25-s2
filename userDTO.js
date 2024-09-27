const UserDTO = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email
});

module.exports = UserDTO;
