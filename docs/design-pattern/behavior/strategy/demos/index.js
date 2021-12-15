class Schema {
  constructor(rules) {
    this.define(rules);
  }

  define(rules) {}
  validate(source) {}
}

const rules = {
  name: {
    type: 'string',
    required: true,
    validator: (rule, value) => value === 'muji',
  },
};

const validator = new Schema(rules);
