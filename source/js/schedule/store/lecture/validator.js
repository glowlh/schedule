class LectureValidator {

  validate(spec, store) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    this.errors = [];
    this.valid = true;
    const {dateFrom: from, dateTo: to} = spec;

    this._classroomExist(spec, store);
    this._teacherExist(spec, store);
    this._allSchoolExist(spec, store);
    this._isValidCount(spec, store);
    this._isValidFromDate(from);
    this._isValidToDate(to);
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

  _classroomExist(spec, store) {
    return this._propertyExists(store.classrooms, spec.classroom);
  }

  _teacherExist(spec, store) {
    return this._propertyExists(store.teachers, spec.teacher);
  }

  _allSchoolExist(spec, store) {
    return spec.schools.some(it => this._propertyExists(store.schools, it));
  }

  _isValidFromDate(from) {
    if (Date.parse(from) < 0 || isNaN(Date.parse(from))) {
      this.errors.push(`'From' date ${from} is not valid`);
      this.valid = false;
    }
  }

  _isValidToDate(to) {
    if (Date.parse(to) < 0 || isNaN(Date.parse(to))) {
      this.errors.push(`'To' date ${to} is not valid`);
      this.valid = false;
    }
  }

  _isValidLecture(spec, store) {
    if (!this.valid) {
      return;
    }

    const lectures = [];
    const from = spec.dateFrom;
    const to = spec.dateTo;
    const lecturesByInterval = store.lectures.findByDate({ from, to });

    spec.schools.forEach((it) => {
      const lecturesBySchool = store.lectures.findBySchool(it);

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

    let schoolsCount = spec.schools.reduce((prevIt, currIt) => {
      return prevIt + store.schools.findByName(currIt).count;
    }, 0);
    const classroomCount = store.classrooms.findByName(spec.classroom).count;
    const hasOverflow = classroomCount < schoolsCount;

    if (hasOverflow) {
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
