type Observer = () => void;

class Subject {
  observers: Observer[] = [];

  listen(observer: Observer) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return;
    }

    this.observers.push(observer);
  }

  remove(observer: Observer) {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return;
    }

    this.observers.splice(observerIndex, 1);
  }

  notify() {
    for (let observer of this.observers) {
      observer();
    }
  }
}
