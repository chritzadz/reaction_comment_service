type LogObserver = () => void;

class LogObservable {
  private observers: LogObserver[] = [];

  subscribe(observer: LogObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: LogObserver) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyAll() {
    this.observers.forEach(observer => observer());
  }
}

export const logObservable = new LogObservable();