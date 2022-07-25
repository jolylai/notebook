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

  equal(a: any, b: any) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: any, b: any) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: any, b: any) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: any, b: any) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: any, b: any) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse(a: any, b: any) {
    const originCompare = this.compare;
    this.compare = (a, b) => originCompare(a, b);
  }
}
