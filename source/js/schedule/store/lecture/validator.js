class LectureValidator {

  constructor() {
    this.message = null;
  }

  valid(data, store) {
    return {
      state: this.hasPropsRule(data, store) && this.hasIndependentPropsRule(data, store),
      message: this.message,
    };
  }
  
  hasPropsRule(data, store) {
    const classroomExists = this._propertyExists(store.classrooms, data.classroom);
    const teacherExists = this._propertyExists(store.teachers, data.teacher);
    const schoolExists = data.schools.some(it => this._propertyExists(store.schools, it));
    return classroomExists && teacherExists && schoolExists;
  }
  
  hasIndependentPropsRule(data, store) {
    let lectures = [];
    const from = data.dateFrom;
    const to = data.dateTo;

    data.schools.forEach((it) => {
      lectures = lectures.concat(store.lectures.findByDate({from, to}, it));
    });

    if (lectures.length > 0) {
      this.message = `This school(s) ${data.schools} is bussy`;
      return false;
    }

    if (!this._isRightCount(data, store)) {
      this.message = `This classroom ${data.classroom} is small for the school(s)`;
      return false;
    }

    return true;
  }

  _isRightCount(data, store) {
    let schoolsCount = 0;
    data.schools.forEach(it => schoolsCount += store.schools.findByName(it).data.count);

    const classroomCount = store.classrooms.findByName(data.classroom).data.count;

    return classroomCount >= schoolsCount;
  }

  _propertyExists(store, name) {
    if (!store.isExist(name)) {
      this.message = `${name} doesn't exist in the store`;
      return;
    }

    return true;
  }
}

export default LectureValidator;
