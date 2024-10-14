const { getAllUsersService,
        getUserByIdService,
        createUserService,
        updateUserService,
        deleteUserService } = require("../services/userService");
//const { validationResult } = require(express-validator);



const getAllUsersController = async(req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json({users});
    }catch(error) {
        res.status(500).json({message: error?.message});
    }
}

const getUserByIdController = async(req, res) => {
      /*  const errors = validationResult(req);
        if(!errors.isEmpty) {
            return res.status(400).json({ errors:errors.array() })
        }*/

    try{
        const { user_id } = req.body;
        const userById = await getUserByIdService(user_id);
        res.status(200).json({user: userById});

    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const createUserController = async(req, res) => {
    try{
        const user = req.body;
        const newUser = await createUserService(user);
        res.status(200).json({ user: newUser });
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const updateUserController = async(req, res) => {
    try{
        const {user_id} = req.params;
        const user = req.body;
        const updatedUser = await updateUserService(user_id, user);
        res.status(200).json({ user:updatedUser });
    }catch(error){
        res.status(500).json({message:error?.message});
    }
}

const deleteUserController = async(req, res) => {
    try{
        const { user_id } = req.body;
        const deleted = await deleteUserService(user_id);
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
          } else {
            res.status(404).json({ message: 'User not found' });
          }

    }catch(error){
        res.status(500).json({message:error?.message});
    }
}

module.exports = {
    getAllUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
};
