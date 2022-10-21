// import { Rule, RuleItem, Rules } from './interface';

// const validators = {
//   //  required: (rule, value, sou) => {}
// };
// // rule

// class Validator {
//   constructor(descriptor: Rules) {
//     this.rules = {};

//     Object.keys(descriptor).forEach(key => {
//       const item: Rule = descriptor[key];

//       this.rules[key] = Array.isArray(item) ? item : [item];
//     });
//   }

//   rules: Record<string, RuleItem[]> = {};

//   validate(value: any) {
//     Object.keys(this.rules).forEach(key => {
//       const rules = this.rules[key];
//       rules.forEach(rule => {
//         rule.validator = validators[rule.type];
//       });
//     });
//   }
// }
