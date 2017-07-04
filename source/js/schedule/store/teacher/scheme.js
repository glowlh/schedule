import Scheme from '../validator.scheme/controller';

class TeacherScheme extends Scheme {

	valid(data) {
		if (!(data instanceof Object)) {
			console.error(`teacher data ${data} is not an Object`);
			return;
		}

		if (typeof data.name !== 'string') {
			console.error(`teacher name ${data.name} is not a String`);
			return;
		}

		return true;
	}
}

export default TeacherScheme;
