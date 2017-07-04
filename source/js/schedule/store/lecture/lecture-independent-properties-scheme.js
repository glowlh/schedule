import Scheme from '../../validator.scheme/controller';
import classroomStore from '../classroom/controller';
import teacherStore from '../teacher/controller';
import schoolStore from '../school/controller';


class LectureIndependentPropertiesScheme extends Scheme {

	valid(info) {
		this.data = info.data;
		this.lectures = info.lectures;
		console.warn(this.data.name);
		console.dir(this.data);

		if (this.lectures.length > 0) {
			console.error(`This school(s) ${this.data.schools} is bussy`);
			return false;
		}

		if (!this._isRightCount()) {
			console.error(`This classroom ${this.data.classroom} is small for the school(s)`);
			return false;
		}

		return true;
	}

	_isRightCount() {
		let schoolsCount = 0;
		this.data.schools.forEach(it => schoolsCount += schoolStore.find(it).data.count);

		const classroomCount = classroomStore.find(this.data.classroom).data.count;

		return classroomCount >= schoolsCount; 
	}

	//todo add checking for teacher
}

export default LectureIndependentPropertiesScheme;
