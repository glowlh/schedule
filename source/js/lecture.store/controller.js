import Store from '../store/controller';
import classroomStore from '../classroom.store/controller';
import schoolStore from '../school.store/controller';
import teacherStore from '../teacher.store/controller';

const PREFIX_ID = 'lecture';

class LectureStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    if (!this._isValid(data)) {
      return;
    }

    const lectureInfo = Object.assign({}, data);
    lectureInfo.classroom = this._getClassroomId(data.classroom);
    lectureInfo.teacher = this._getTeacherId(data.teacher);
    lectureInfo.schools = data.schools.map(it => this._getSchoolId(it));

    super.add(lectureInfo, PREFIX_ID);
  }

  findByDate(date, school) {
    const lectures = [];
    const from = new Date(date.from);
    const to = new Date(date.to);
    const properInterval = {
      from,
      to,
    };

    this.items.forEach((it) => {
      if (this._hasSchool) {
        const from = it.lecture.dateFrom;
        const to = it.lecture.dateTo;
        const currentInterval = {
          from,
          to,
        };

        if (this._hasDateInterval(currentInterval, properInterval)) {
          const lecture = this._adapt(it.lecture);
          lectures.push(lecture);
        }
      }
    });

    return lectures;
  }

  _adapt(lecture) {
    const item = Object.assign({}, lecture);
    item.classroom = classroomStore.findById(lecture.classroom).classroom;
    item.teacher = teacherStore.findById(lecture.teacher).teacher;
    item.schools = lecture.schools.map(it => schoolStore.findById(it).school);

    return item;
  }

  _hasSchool(lecture, school) {
    const schools = lecture.schools.map((it) => {
      const school = schoolStore.findById(it).school;
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

  _getSchoolId(name) {
    return schoolStore.find(name).id;
  }

  _getClassroomId(name) {
    return classroomStore.find(name).id;
  }

  _getTeacherId(name) {
    return teacherStore.find(name).id;
  }

  _isValid(data) {
    const classroom = data.classroom;
    const teacher = data.teacher;
    const schools = data.schools;

    const result =
      this._classroomExists(classroom) &&
      this._teacherExists(teacher) &&
      this._schoolsExist(schools);

    return result;
  }

  _classroomExists(name) {
    return classroomStore.find(name);
  }

  _teacherExists(name) {
    return teacherStore.find(name);
  }

  _schoolsExist(names) {
    return names.some(it => schoolStore.find(it));
  }
}

const lectureStore = new LectureStore();
export default lectureStore;
