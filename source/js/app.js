import Schedule from './schedule/app';

const schedule = new Schedule();

const classroomPromiseAdd = schedule.store.classrooms
  .add({
    name: 'Blue whale',
    count: 50,
    description: 'Amazing!'
  }).catch((e) => console.warn(e));

const schoolPromiseAdd1 = schedule.store.schools
  .add({
    name: '1-SCHOOL',
    count: 15,
  }).catch((e) => console.warn(e));

const schoolPromiseAdd2 = schedule.store.schools
  .add({
    name: '2-SCHOOL',
    count: 15,
  }).catch((e) => console.warn(e));

const teacherPromiseAdd = schedule.store.teachers
  .add({
    name: 'John',
    description: 'super teacher'
  }).catch((e) => console.warn(e));

Promise.all([
  classroomPromiseAdd,
  schoolPromiseAdd1,
  schoolPromiseAdd2,
  teacherPromiseAdd
]).then(() =>
    schedule.store.lectures
      .add({
        name: 'Lecture 1',
        schools: ['1-SCHOOL'],
        teacher: 'John',
        classroom: 'Blue whale',
        dateFrom: '2017-02-20T11:00',
        dateTo: '2017-02-20T12:00',
      })
  ).then(() =>
    schedule.store.lectures
      .add({
        name: 'Lecture 2',
        schools: ['2-SCHOOL'],
        teacher: 'John',
        classroom: 'Blue whale',
        dateFrom: '2017-02-15T00:00',
        dateTo: '2017-02-15T02:00',
      })
  ).then(() =>
    schedule.store.lectures
      .add({
        name: 'Lecture 3',
        schools: ['1-SCHOOL'],
        teacher: 'John',
        classroom: 'Blue whale',
        dateFrom: '2017-02-02T20:00',
        dateTo: '2017-02-02T21:00',
      })
  ).then(() => {
    const date = {
      from: '2017-02-19T20:30',
      to: '2017-02-21T22:00'
    };
    console.dir(schedule.getLecturesByDateInSchool(date, '1-SCHOOL'));
  });
