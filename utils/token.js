const createTokenUser = (user) => {
	return { UserId: user._id, role: user.role, name: user.name }
}

module.exports = { createTokenUser }
