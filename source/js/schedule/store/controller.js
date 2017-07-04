import ClassroomStore from './classroom/controller';
import SchoolStore from './school/controller';
import TeacherStore from './teacher/controller';
import LecturesStore from './lecture/controller';

class Store {

  constructor() {
    this.classrooms = new ClassroomStore(this);
    this.schools = new SchoolStore(this);
    this.teachers = new TeacherStore(this);
    this.lectures = new LecturesStore(this);
  }
}

const store = new Store();
export default store;
