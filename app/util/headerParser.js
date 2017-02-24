module.exports = function (header) {
	if (!header)
		return null;
	if (!header['authorization'])
		return null;
	return header['authorization'].split(' ')[1];
};