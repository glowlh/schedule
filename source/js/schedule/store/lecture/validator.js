class LectureValidator {

  validate(spec, store) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    this.errors = [];
    this.valid = true;

    this._isValidClassroom(spec, store);
    this._isValidTeacher(spec, store);
    this._isValidSchool(spec, store);
    this._isValidCount(spec, store);
    this._isValidLecture(spec, store);

    if (this.valid) {
      deferred.resolve({ valid: this.valid });
    } else {
      deferred.reject({
        valid: this.valid,
        errors: this.errors,
      });
    }

    return deferred.promise;
  }

  _isValidClassroom(spec, store) {
    return this._propertyExists(store.classrooms, spec.classroom);
  }

  _isValidTeacher(spec, store) {
    return this._propertyExists(store.teachers, spec.teacher);
  }

  _isValidSchool(spec, store) {
    return spec.schools.some(it => this._propertyExists(store.schools, it));
  }

  _isValidLecture(spec, store) {
    if (!this.valid) {
      return;
    }

    const lectures = [];
    const from = spec.dateFrom;
    const to = spec.dateTo;

    spec.schools.forEach((it) => {
      const lecturesByInterval = store.lectures.findByDate({ from, to }) || [];
      const lecturesBySchool = store.lectures.findBySchool(it) || [];

      lecturesByInterval.forEach((p) => {
        lecturesBySchool.forEach((o) => {
          if (p.id === o.id) {
            lectures.push(p);
          }
        });
      });
    });

    if (lectures.length > 0) {
      this.errors.push(`This school(s) ${spec.schools} is busy`);
      this.valid = false;
    }
  }

  _isValidCount(spec, store) {
    if (!this.valid) {
      return;
    }

    let schoolsCount = 0;

    spec.schools.forEach((it) => {
      schoolsCount += store.schools.findByName(it).data.count;
    });
    const classroomCount = store.classrooms.findByName(spec.classroom).data.count;
    const isRoomyClassroom = classroomCount >= schoolsCount;

    if (!isRoomyClassroom) {
      this.errors.push(`This classroom ${spec.classroom} is small for the school(s)`);
      this.valid = false;
    }
  }

  _propertyExists(store, name) {
    if (!store.isExist(name)) {
      this.errors.push(`${name} doesn't exist in the store`);
      this.valid = false;
    }
  }
}

export default LectureValidator;
