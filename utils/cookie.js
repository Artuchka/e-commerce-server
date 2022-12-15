const attachCookieToResponse = async (res, tokenUser) => {
	const oneDay = 1000 * 60 * 60 * 24
	res.cookie("token", tokenUser, {
		expires: new Date(Date.now() + oneDay),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
	})
	return res
}

const clearCookieToken = async (res) => {
	res.cookie("token", "logout placeholder for token", {
		expires: new Date(Date.now()),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
	})
}

module.exports = { attachCookieToResponse, clearCookieToken }
