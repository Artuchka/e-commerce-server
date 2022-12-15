const notFound = async (req, res) =>
	res.status(404).json({ msg: "not found route" })

module.exports = { notFound }
