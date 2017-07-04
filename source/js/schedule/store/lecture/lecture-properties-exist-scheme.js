import Scheme from '../../validator.scheme/controller';

class LecturePropertiesExistScheme extends Scheme {

  valid(data, store) {
    this.store = store;
    const classroomExists = this._propertyExists(this.store.classrooms, data.classroom);
    const teacherExists = this._propertyExists(this.store.teachers, data.teacher);
    const schoolExists = data.schools.some(it => this._propertyExists(this.store.schools, it));
    const propertiesExistInStore = classroomExists && teacherExists && schoolExists;

    return propertiesExistInStore;
  }

  _propertyExists(store, name) {
    if (!store.isExist(name)) {
      console.error(`${name} doesn't exist in the store`);
      return;
    }

    return true;
  }
}

export default LecturePropertiesExistScheme;
