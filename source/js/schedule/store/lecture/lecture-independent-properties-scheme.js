import Scheme from '../../validator.scheme/controller';

class LectureIndependentPropertiesScheme extends Scheme {

  valid(info, store) {
    this.store = store;
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
    this.data.schools.forEach(it => schoolsCount += this.store.schools.find(it).data.count);

    const classroomCount = this.store.classrooms.find(this.data.classroom).data.count;

    return classroomCount >= schoolsCount;
  }

  //todo add checking for teacher
}

export default LectureIndependentPropertiesScheme;
