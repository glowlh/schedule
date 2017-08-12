import store from './store/controller';

class Schedule {

  constructor() {
    this.store = store;
  }

  getLecturesByDateInSchool(date, school) {
    const lecturesByDate = this.store.lectures.findByDate(date);
    const lecturesBySchool = this.store.lectures.findBySchool(school);

    return this._getTwoLectureListsUnion(lecturesByDate, lecturesBySchool);
  }

  getLecturesByDateInClassroom(date, classroom) {
    const lecturesByDate = this.store.lectures.findByDate(date);
    const lecturesByClassroom = this.store.lectures.findByClassroom(classroom);

    return this._getTwoLectureListsUnion(lecturesByDate, lecturesByClassroom);
  }

  _getTwoLectureListsUnion(lecturesItemsFirst, lecturesItemsSecond) {
    return lecturesItemsFirst.filter((it) => {
      const id = it.id;
      return lecturesItemsSecond.some(p => p.id === id);
    })
  }
}

export default Schedule;
