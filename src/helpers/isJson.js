function isJson(str) {
	return /^\{.*\}$/.test(str) || /^\[.*\]$/.test(str);
}
export default isJson;
