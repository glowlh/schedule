import classroomStore from '../classroom.store/controller';
import schoolStore from '../school.store/controller';
import teacherStore from '../teacher.store/controller';
import lecturesStore from '../lecture.store/controller';

class Schedule {

  constructor() {
    this.classrooms = classroomStore;
    this.schools = schoolStore;
    this.teachers = teacherStore;
    this.lectures = lecturesStore;
  }
}

export default Schedule;
