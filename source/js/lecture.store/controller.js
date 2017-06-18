import Store from '../store/controller';
import Lecture from '../lecture/controller';
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

    const item = Object.assign({}, data);
    item.classroom = this._getClassroomId(data.classroom);
    item.teacher = this._getTeacherId(data.teacher);
    item.schools = data.schools.map(it => this._getSchoolId(it));

    const lecture = new Lecture(item);
    const id = this._generateId(PREFIX_ID);

    this.items.set(id, lecture);
  }

  delete(id) {
    this.items.delete(id);
  }

  find(id) {
    return this.items.get(id);
  }

  findByDate(date) {

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
