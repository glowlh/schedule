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
        dateFrom: '2017-04-02T11:00',
        dateTo: '2017-04-02T12:00',
      })
  ).then(() =>
    schedule.store.lectures
      .add({
        name: 'Lecture 2',
        schools: ['2-SCHOOL'],
        teacher: 'John',
        classroom: 'Blue whale',
        dateFrom: '2017-04-02T00:00',
        dateTo: '2017-06-02T02:00',
      })
  ).then(() =>
    schedule.store.lectures
      .add({
        name: 'Lecture 3',
        schools: ['1-SCHOOL'],
        teacher: 'John',
        classroom: 'Blue whale',
        dateFrom: '2017-04-02T20:00',
        dateTo: '2017-05-02T21:00',
      })
  ).then(() => console.dir(schedule.store));

const date = {
  from: '2010-02-02T00:00',
  to: '2020-04-02T12:00'
};
