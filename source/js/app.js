import Schedule from './schedule/index';

const schedule = new Schedule();

const classroomPromiseAdd1 = schedule.store.classrooms
  .add({
    name: 'Blue whale',
    count: 20,
    description: 'Amazing!',
  });

const classroomPromiseAdd2 = schedule.store.classrooms
  .add({
    name: 'Skies',
    count: 33,
    description: 'Light blue!',
  });

const schoolPromiseAdd1 = schedule.store.schools
  .add({
    name: '1-SCHOOL',
    count: 15,
  });

const schoolPromiseAdd2 = schedule.store.schools
  .add({
    name: '2-SCHOOL',
    count: 15,
  });

const teacherPromiseAdd = schedule.store.teachers
  .add({
    name: 'John',
    description: 'super teacher',
  });

Promise.all([
  classroomPromiseAdd1,
  classroomPromiseAdd2,
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
        classroom: 'Skies',
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
  )
  .then(() => {
    const date = {
      from: '2015-02-19T20:30',
      to: '2019-02-21T22:00',
    };
    console.dir(schedule.getLecturesByDateInClassroom(date, 'Skies'));
  });
