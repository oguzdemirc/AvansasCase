
class GeneralHelper {

	static toKebabCase(str) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
}

export default GeneralHelper;