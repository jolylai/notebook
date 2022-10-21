class Subscriber {
  update(observer: Observer) {}
}

export default class Observer {
  state: number = 1;
  subscribers: Subscriber[] = [];

  /**
   * 订阅
   * @param subscriber
   */
  subscribe(subscriber: Subscriber) {
    const isExist = this.subscribers.includes(subscriber);
    if (isExist) {
      return console.log('subscriber has been exist already');
    }

    this.subscribers.push(subscriber);
  }

  /**
   * 取消订阅
   * @param subscriber
   */
  unsubscribe(subscriber: Subscriber) {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    if (subscriberIndex === -1) {
      return console.log('subscriber does not exist!');
    }

    this.subscribers.splice(subscriberIndex, 1);
  }

  /**
   * 通知所有订阅者
   */
  notify() {
    for (const subscriber of this.subscribers) {
      subscriber.update(this);
    }
  }

  someBusinessLogic() {
    // do something
    this.state = Math.floor(Math.random() * (10 + 1));

    this.notify();
  }
}
