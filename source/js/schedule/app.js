import store from './store/controller';

class Schedule {

  constructor() {
    this.store = store;
  }

  getLecturesByDateInSchool(date, school) {
    const lecturesByDate = this.store.lectures.findByDate(date);
    const lecturesBySchool = this.store.lectures.findBySchool(school);

    return this._getTwoLecturesUnion(lecturesByDate, lecturesBySchool);
  }

  _getTwoLecturesUnion(lecturesItemsFirst, lecturesItemsSecond) {
    return lecturesItemsFirst.filter((it) => {
      const id = it.id;
      return lecturesItemsSecond.some(p => p.id === id);
    })
  }
}

export default Schedule;
