import Schedule from './schedule/controller';

const schedule = new Schedule();

schedule.classrooms.add({
  name: 'Blue wheel',
  count: 25,
  description: ''
});
schedule.schools.add({
  name: '1-SCHOOL',
  count: 12
});

schedule.teachers.add({
  name: 'John',
  description: 'super teacher'
});

schedule.lectures.add({
  name: 'Lecture 1',
  schools: ['1-SCHOOL'],
  teacher: 'John',
  classroom: 'Blue wheel',
  dateFrom: '2017-05-05T00:00:00',
  dateTo: '2017-05-05T10:00:00',
});

console.dir(schedule);
