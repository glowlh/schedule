import Store from '../store/controller';

const PREFIX_ID = 'classroom';

class ClassroomStore extends Store {

  add(data) {
    super.add(data, PREFIX_ID);
  }
}

const classroomStore = new ClassroomStore();
export default classroomStore;
