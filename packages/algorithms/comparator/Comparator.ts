type CompareResult = -1 | 0 | 1;

type ComparatorFunction = (a: any, b: any) => CompareResult;

export default class Comparator {
  compare: ComparatorFunction;

  constructor(compareFunction?: ComparatorFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a: any, b: any) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }
}
