class Validator {

	constructor(scheme = null) {
		this.scheme = scheme;
	}

	getScheme() {
		return this.scheme;
	}

	setScheme(scheme) {
		this.scheme = scheme;
	}

	valid(data = null) {
		if (!this.scheme){
			return;
		}
		
		return this.scheme.valid(data);
	}
}

export default Validator;
