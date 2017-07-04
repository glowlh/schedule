import Store from '../base/controller';
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
    lectureInfo.classroom = this.store.classrooms.find(data.classroom).id;
    lectureInfo.teacher = this.store.teachers.find(data.teacher).id;
    lectureInfo.schools = data.schools.map(it => this.store.schools.find(it).id);
    lectureInfo.dateFrom = new Date(data.dateFrom);
    lectureInfo.dateTo = new Date(data.dateTo);
    super.add(lectureInfo);
  }

  findByDate(date, school) {
    const lectures = [];
    const from = new Date(date.from);
    const to = new Date(date.to);
    const properInterval = {
      from,
      to,
    };

    this.items.forEach((p) => {
      const item = p.data;

      if (this._hasSchool(item, school)) {
        const from = item.dateFrom;
        const to = item.dateTo;
        const currentInterval = {
          from,
          to,
        };
 
        if (this._hasDateInterval(currentInterval, properInterval)) {
          // const lecture = this._adapt(item);
          lectures.push(item);
        }
      }
    });

    return lectures;
  }

  _adapt(lecture) {
    const item = Object.assign({}, lecture);
    item.classroom = this.store.classrooms.findById(lecture.classroom).data.name;
    item.teacher = this.store.teachers.findById(lecture.teacher).data.name;
    item.schools = lecture.schools.map(it => this.store.schools.findById(it).data.name);

    return item;
  }

  _hasSchool(lecture, school) {
    const schools = lecture.schools.map((it) => {
      const school = this.store.schools.findById(it).data;
      return school.name;
    });

    return schools.indexOf(school) >= 0;
  }

  _hasDateInterval(current, proper) {
    const currentIsBeforeProper = current.to <= proper.from;
    const currentIsAfterProper = current.from <= proper.to;
    const inNotRightInterval = currentIsBeforeProper || !currentIsAfterProper;

    return !inNotRightInterval;
  }
}

export default LectureStore;
