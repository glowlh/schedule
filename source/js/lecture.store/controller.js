import Store from '../store/controller';
import classroomStore from '../classroom.store/controller';
import schoolStore from '../school.store/controller';
import teacherStore from '../teacher.store/controller';
import Validator from '../validator/controller';
import LecturePropertiesExistScheme from '../validator.scheme/lecture-properties-exist-scheme';
import LectureIndependentPropertiesScheme from '../validator.scheme/lecture-independent-properties-scheme';

class LectureStore extends Store {

  constructor() {
    super();
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
    lectureInfo.classroom = classroomStore.find(data.classroom).id;
    lectureInfo.teacher = teacherStore.find(data.teacher).id;
    lectureInfo.schools = data.schools.map(it => schoolStore.find(it).id);
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
    return this.validator.valid(data);
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

    if (!this.validator.valid({ data, lectures })) {
      return false;
    }

    return true;
  }

  _adapt(lecture) {
    const item = Object.assign({}, lecture);
    item.classroom = classroomStore.findById(lecture.classroom).data.name;
    item.teacher = teacherStore.findById(lecture.teacher).data.name;
    item.schools = lecture.schools.map(it => schoolStore.findById(it).data.name);

    return item;
  }

  _hasSchool(lecture, school) {
    const schools = lecture.schools.map((it) => {
      const school = schoolStore.findById(it).data;
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

const lectureStore = new LectureStore();
export default lectureStore;
