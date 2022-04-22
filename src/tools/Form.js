export class Form {
  constructor(data) {
    data = data || {};
    for (let field in data) {
      this[field] = data[field];
    }
  }
}