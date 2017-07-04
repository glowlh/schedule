import Store from '../base/controller';
import Validator from '../../validator/controller';
import LecturePropertiesExistScheme from './lecture-properties-exist-scheme';
import LectureIndependentPropertiesScheme from './lecture-independent-properties-scheme';

class LectureStore extends Store {

  constructor(store) {
    super(store);
    this.validator = new Validator();
  }

  add(data) {
    if (!this._isValidExistProps(data)) {
      return;
    }

    if (!this._isValidIndependentProps(data)) {
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

  _isValidExistProps(data) {
    const lecturePropertiesExistScheme = new LecturePropertiesExistScheme();
    this.validator.setScheme(lecturePropertiesExistScheme);
    return this.validator.valid(data, this.store);
  }

  _isValidIndependentProps(data) {
    const lectureIndependentPropertiesScheme = new LectureIndependentPropertiesScheme();
    this.validator.setScheme(lectureIndependentPropertiesScheme);
    let lectures = [];
    const from = data.dateFrom;
    const to = data.dateTo;

    data.schools.forEach((it) => {
      lectures = lectures.concat(this.findByDate({from, to}, it));
    });

    if (!this.validator.valid({ data, lectures }, this.store)) {
      return false;
    }

    return true;
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
