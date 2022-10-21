export type RuleItem = {
  type?: string;
  required?: boolean;
  pattern?: string;
};

export type Rule = RuleItem | RuleItem[];
export type Rules = Record<string, Rule>;
