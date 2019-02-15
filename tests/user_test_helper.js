const User = require('../models/user')

const initialUsers = [
    {
        name: "Rauno Repomies",
        username: "RepomiehenRauno",
        password: "salasana123"
    },
    {
        name: "Kyösti Pöysti",
        username: "spösse",
        password: "salasana321"
    }
]

const nonExistingId = async () => {
    const user = new User({name: "Removed", username: "Removed", password: "Removed"})
    await user.save()
    await user.remove()

    return user._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers, nonExistingId, usersInDb
}