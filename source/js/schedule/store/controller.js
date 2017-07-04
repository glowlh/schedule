import classroomStore from '../classroom/controller';
import schoolStore from '../school/controller';
import teacherStore from '../teacher/controller';
import lecturesStore from '../lecture/controller';

class Store {

  constructor() {
    this.classrooms = classroomStore;
    this.schools = schoolStore;
    this.teachers = teacherStore;
    this.lectures = lecturesStore;
  }
}

export default Store;
