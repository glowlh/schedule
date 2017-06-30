import Scheme from './Scheme';

class SchoolScheme extends Scheme {

	valid(data) {
		if (!(data instanceof Object)) {
			console.error(`school data ${data} is not an Object`);
			return;
		}

		if (typeof data.name !== 'string') {
			console.error(`school name ${data.name} is not a String`);
			return;
		}

		if (typeof data.count !== 'number') {
			console.error(`school count ${data.count} is not a Number`);
			return;
		}

		return true;
	}
}

export default SchoolScheme;
