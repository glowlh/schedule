import StoreBase from '../store-base';
import LectureValidator from './validator';

class LectureStore extends StoreBase {

  constructor(store) {
    super(store);
    this.validator = new LectureValidator();
  }

  add(data) {
    return this.validator.validate(data, this.store)
      .then(() => {
        const lectureInfo = Object.assign({}, data);
        lectureInfo.classroom = this.store.classrooms.findByName(data.classroom).id;
        lectureInfo.teacher = this.store.teachers.findByName(data.teacher).id;
        lectureInfo.schools = data.schools.map(it => this.store.schools.findByName(it).id);
        lectureInfo.dateFrom = (new Date(data.dateFrom)).toISOString();
        lectureInfo.dateTo = (new Date(data.dateTo)).toISOString();

        super.add(lectureInfo);
      })
      .catch(error => error);
  }

  findBySchool(name) {
    const result = [];

    this.items.forEach((p) => {
      const lecture = p;
      const schools = lecture.schools.map((it) => {
        const school = this.store.schools.findById(it);
        return school.name;
      });

      schools.indexOf(name) >= 0 ? result.push(lecture) : null;
    });

    return result;
  }

  findByTeacher(name) {
    const result = [];

    this.items.forEach((p) => {
      const lecture = p;
      const teacher = this.store.teacher.findById(lecture.teacher);

      teacher.name === name ? result.push(lecture) : null;
    });

    return result;
  }

  findByClassroom(name) {
    const result = [];

    this.items.forEach((p) => {
      const lecture = p;
      const classroom = this.store.classrooms.findById(lecture.classroom);

      classroom.name === name ? result.push(lecture) : null;
    });

    return result;
  }

  findByDate(date) {
    const result = [];
    const from = new Date(date.from);
    const to = new Date(date.to);
    const adjustedInterval = {
      from: from.toISOString(),
      to: to.toISOString(),
    };

    this.items.forEach((p) => {
      const lecture = p;
      const currentFrom = lecture.dateFrom;
      const currentTo = lecture.dateTo;
      const currentInterval = {
        from: currentFrom,
        to: currentTo,
      };

      this._hasDateInterval(currentInterval, adjustedInterval) ? result.push(lecture) : null;
    });

    return result;
  }

  _hasDateInterval(current, adjusted) {
    const currentIsBeforeAdjusted = current.to < adjusted.from;
    const currentIsAfterAdjusted = current.from > adjusted.to;

    return !currentIsBeforeAdjusted && !currentIsAfterAdjusted;
  }
}

export default LectureStore;
