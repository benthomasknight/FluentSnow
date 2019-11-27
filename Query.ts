export class Query {
  /** Internal implementation detail */
  private _previous: () => any;
  private _not = false;

  constructor(previous?: any) {
    if (previous) {
      this._previous = previous;
    }
    else {
      this._previous = () => {};
    }
  }

  // public api for registering an observer
  get() {
    return this._previous()
  }

  /**
   * Language Chains
   */
  get to() {
    return this;
  }
  get be() {
    return this;
  }
  get been() {
    return this;
  }
  get is() {
    return this;
  }
  get that() {
    return this;
  }
  get which() {
    return this;
  }
  get has() {
    return this;
  }
  get have() {
    return this;
  }
  get with() {
    return this;
  }
  get at() {
    return this;
  }
  get of() {
    return this;
  }
  get same() {
    return this;
  }
  get but() {
    return this;
  }
  get does() {
    return this;
  }
  get still() {
    return this;
  }
  get an() {
    return this;
  }
  get the() {
    return this;
  }


  static field(f: string) {
    return new Query(() => {
      return f;
    });
  }

  /**
   * Joiners
   */
  and(f: string) {
    return new Query(() => {
      const p = this._previous();
      return p + '^' + f;
    });
  }
  or(f: string) {
    return new Query(() => {
      const p = this._previous();
      return p + '^OR' + f;
    });
  }
  elseIf(f: string) {
    return new Query(() => {
      const p = this._previous();
      return p + '^NQ' + f;
    });
  }

  /**
   * Negate the next statement
   */
  get not() {
    this._not = true;
    return this;
  }

  /**
   * Booleans
   */
  get true() {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '!=' : '=';
      return v + op + 'true';
    });
  }
  get false() {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '!=' : '=';
      return v + op + 'false';
    });
  }

  /**
   * Existance
   */
  get empty() {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? 'ISNOTEMPTY' : 'ISEMPTY';
      return v + op;
    });
  }
  get exists() {
    return this.empty;
  }
  get anything() {
    return new Query(() => {
      const v = this._previous();
      return v + 'ANYTHING';
    });
  }
  get emptyString() {
    return new Query(() => {
      const v = this._previous();
      return v + 'EMPTYSTRING';
    });
  }


  /**
   * Equality
   * @param value any value
   */
  equal(value: any) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '!=' : '=';
      return v + op + value;
    });
  }

  above(value: any) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '<=' : '>';
      return v + op + value;
    });
  }

  least(value: any) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '<' : '>=';
      return v + op + value;
    });
  }

  below(value: any) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '>=' : '<';
      return v + op + value;
    });
  }

  most(value: any) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? '>' : '<=';
      return v + op + value;
    });
  }

  within(start: any, finish: any) {
    return new Query(() => {
      const v = this._previous();
      return v + 'BETWEEN' + start + '@' + finish;
    });
  }

  between(start: any, end: any) {
    return this.within(start, end);
  }

  startWith(value: string) {
    return new Query(() => {
      const v = this._previous();
      return v + 'STARTSWITH' + value;
    });
  }

  endWith(value: string) {
    return new Query(() => {
      const v = this._previous();
      return v + 'ENDSWITH' + value;
    });
  }

  contain(value: string) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? 'NOTLIKE' : 'LIKE';
      return v + op + value;
    });
  }

  sameAs(value: string) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? 'NSAMEAS' : 'SAMEAS';
      return v + op + value;
    });
  }

  oneOf(...args: any[]) {
    return new Query(() => {
      const v = this._previous();
      const op = this._not ? 'NOT IN' : 'IN';
      return v + op + args.join(',');
    });
  }

  dynamic(value: string) {
    return new Query(() => {
      const v = this._previous();
      return v + 'DYNAMIC' + value;
    });
  }

  /**
   * Changing
   */
  get change() {
    return new Query(() => {
      const v = this._previous();
      return v + 'VALCHANGES';
    });
  }

  changeFrom(value: string) {
    return new Query(() => {
      const v = this._previous();
      return v + 'CHANGESFROM' + value;
    });
  }

  changeTo(value: string) {
    return new Query(() => {
      const v = this._previous();
      return v + 'CHANGESTO' + value;
    });
  }
}