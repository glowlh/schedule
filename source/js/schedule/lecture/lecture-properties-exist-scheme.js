import Scheme from '../validator.scheme/controller';
import classroomStore from '../classroom/controller';
import teacherStore from '../teacher/controller';
import schoolStore from '../school/controller';

class LecturePropertiesExistScheme extends Scheme {

	valid(data) {
		const classroomExists = this._propertyExists(classroomStore, data.classroom);
		const teacherExists = this._propertyExists(teacherStore, data.teacher);
		const schoolExists = data.schools.some(it => this._propertyExists(schoolStore, it));
		const propertiesExistInStore = classroomExists && teacherExists && schoolExists;

		return propertiesExistInStore;
	}

	_propertyExists(store, name) {
		if (!store.isExist(name)) {
			console.error(`${name} doesn't exist in the store`);
			return;
		}

		return true;
	}
}

export default LecturePropertiesExistScheme;
