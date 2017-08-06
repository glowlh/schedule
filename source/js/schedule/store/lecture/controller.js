import Store from '../store-base';
import LectureValidator from './validator';

class LectureStore extends Store {

  constructor(store) {
    super(store);
    this.validator = new LectureValidator();
  }

  add(data) {
    if (!this.validator.valid(data, this.store)) {
      return;
    }

    const lectureInfo = Object.assign({}, data);
    lectureInfo.classroom = this.store.classrooms.findByName(data.classroom).id;
    lectureInfo.teacher = this.store.teachers.findByName(data.teacher).id;
    lectureInfo.schools = data.schools.map(it => this.store.schools.find(it).id);
    lectureInfo.dateFrom = new Date(data.dateFrom);
    lectureInfo.dateTo = new Date(data.dateTo);
    super.add(lectureInfo);
  }

  findBySchool(name) {
    return this.items.filter((p) => {
      const lecture = p.data;
      const schools = lecture.schools.map((it) => {
        const school = this.store.schools.findById(it).data;
        return school.name;
      });

      return schools.indexOf(name) >= 0;
    });
  }

  findByTeacher(name) {
    return this.items.filter((p) => {
      const lecture = p.data;
      const teacher = this.store.teacher.findById(lecture.teacher);

      return teacher.name === name;
    });
  }

  findByClassroom(name) {
    return this.items.filter((p) => {
      const lecture = p.data;
      const classroom = this.store.classroom.findById(lecture.classroom);

      return classroom.name === name;
    });
  }

  findByDate(date) {
    const from = new Date(date.from);
    const to = new Date(date.to);
    const properInterval = {
      from,
      to,
    };

    return this.items.filter((p) => {
      const item = p.data;
      const from = item.dateFrom;
      const to = item.dateTo;
      const currentInterval = {
        from,
        to,
      };

      return this._hasDateInterval(currentInterval, properInterval);
    });
  }

  _hasDateInterval(current, adjusted) {
    const currentIsBeforeProper = current.to <= adjusted.from;
    const currentIsAfterProper = current.from <= adjusted.to;

    return !currentIsBeforeProper && currentIsAfterProper;
  }
}

export default LectureStore;
