interface Strategy {
  doAlgorithm(data: string[]): string[];
}

export class StrategyA implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

export class StrategyB implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

export class Content {
  strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  doSomeBusinessLogic() {
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);

    console.log(result.join(','));
  }
}
