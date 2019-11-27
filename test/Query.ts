import { describe, it } from "mocha";
import { expect } from 'chai';
import { Query } from '../Query';

const stringField = ['string_1', 'value_1'];
const numberField = ['number_1', 1, 2];
const booleanFieldTrue = ['boolean_1', true];
const booleanFieldFalse = ['boolean_2', false];

describe('Query', () => {
  it('should handle equals comparisons', () => {
    const str = Query.field(stringField[0]).to.equal(stringField[1]).get();
    expect(str).to.eq(stringField[0] + '=' + stringField[1]);
  })
  it('should handle not equals comparisons', () => {
    const str = Query.field(stringField[0]).not.to.equal(stringField[1]).get();
    expect(str).to.eq(stringField[0] + '!=' + stringField[1]);
  })


  it('should handle true', () => {
    const str = Query.field(<any>booleanFieldTrue[0]).to.be.true.get();
    expect(str).to.eq(booleanFieldTrue[0] + '=' + booleanFieldTrue[1]);
  })
  it('should handle not true', () => {
    const str = Query.field(<any>booleanFieldTrue[0]).to.not.be.true.get();
    expect(str).to.eq(booleanFieldTrue[0] + '!=' + booleanFieldTrue[1]);
  })


  it('should handle false', () => {
    const str = Query.field(<any>booleanFieldFalse[0]).to.be.false.get();
    expect(str).to.eq(booleanFieldFalse[0] + '=' + booleanFieldFalse[1]);
  })
  it('should handle not false', () => {
    const str = Query.field(<any>booleanFieldFalse[0]).to.not.be.false.get();
    expect(str).to.eq(booleanFieldFalse[0] + '!=' + booleanFieldFalse[1]);
  })


  it('should handle above', () => {
    const str = Query.field(<any>numberField[0]).to.be.above(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '>' + numberField[1])
  })
  it('should handle not above', () => {
    const str = Query.field(<any>numberField[0]).to.not.be.above(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '<=' + numberField[1])
  })


  it('should handle at least', () => {
    const str = Query.field(<any>numberField[0]).to.be.at.least(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '>=' + numberField[1])
  })
  it('should handle not at least', () => {
    const str = Query.field(<any>numberField[0]).to.not.be.at.least(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '<' + numberField[1])
  })


  it('should handle below', () => {
    const str = Query.field(<any>numberField[0]).to.be.below(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '<' + numberField[1])
  })
  it('should handle not below', () => {
    const str = Query.field(<any>numberField[0]).to.not.be.below(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '>=' + numberField[1])
  })


  it('should handle at most', () => {
    const str = Query.field(<any>numberField[0]).to.be.at.most(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '<=' + numberField[1])
  })
  it('should handle not at most', () => {
    const str = Query.field(<any>numberField[0]).to.not.be.at.most(numberField[1]).get();
    expect(str).to.equal(numberField[0] + '>' + numberField[1])
  })


  it('should handle within', () => {
    const str = Query.field(<any>numberField[0]).to.be.within(numberField[1], numberField[2]).get();
    expect(str).to.equal(numberField[0] + 'BETWEEN' + numberField[1] + '@' + numberField[2])
  })
  it('should handle between', () => {
    const str = Query.field(<any>numberField[0]).to.be.between(numberField[1], numberField[2]).get();
    expect(str).to.equal(numberField[0] + 'BETWEEN' + numberField[1] + '@' + numberField[2])
  })


  it('should handle startsWith', () => {
    const str = Query.field(<any>stringField[0]).to.startWith(stringField[1]).get();
    expect(str).to.equal(stringField[0] + 'STARTSWITH' + stringField[1])
  })
  it('should handle endsWith', () => {
    const str = Query.field(<any>stringField[0]).to.endWith(stringField[1]).get();
    expect(str).to.equal(stringField[0] + 'ENDSWITH' + stringField[1])
  })


  it('should handle contains', () => {
    const str = Query.field(<any>stringField[0]).to.contain(stringField[1]).get();
    expect(str).to.equal(stringField[0] + 'LIKE' + stringField[1])
  })
  it('should handle not contains', () => {
    const str = Query.field(<any>stringField[0]).to.not.contain(stringField[1]).get();
    expect(str).to.equal(stringField[0] + 'NOTLIKE' + stringField[1])
  })


  it('should handle same as', () => {
    const str = Query.field(<any>stringField[0]).to.be.the.sameAs(stringField[1]).get();
    expect(str).to.equal(stringField[0] + 'SAMEAS' + stringField[1])
  })
  it('should handle not same as', () => {
    const str = Query.field(<any>stringField[0]).to.not.be.the.sameAs(stringField[1]).get();
    expect(str).to.equal(stringField[0] + 'NSAMEAS' + stringField[1])
  })


  it('should handle one of', () => {
    const str = Query.field(<any>numberField[0]).to.be.oneOf(numberField[1], numberField[2]).get();
    expect(str).to.equal(numberField[0] + 'IN' + numberField[1] + ',' + numberField[2])
  })
  it('should handle not one of', () => {
    const str = Query.field(<any>numberField[0]).to.not.be.oneOf(numberField[1], numberField[2]).get();
    expect(str).to.equal(numberField[0] + 'NOT IN' + numberField[1] + ',' + numberField[2])
  })


  /**
   * Combined queries
   */
  it('should handle ands', () => {
    const str = Query.field(<any>stringField[0])
      .to.equal(stringField[1])
      .and(<any>numberField[0]).to.equal(numberField[1])
      .get();
    expect(str).to.equal(`${stringField[0]}=${stringField[1]}^${numberField[0]}=${numberField[1]}`)
  })
  it('should handle ors', () => {
    const str = Query.field(<any>stringField[0])
      .to.equal(stringField[1])
      .or(<any>numberField[0]).to.equal(numberField[1])
      .get();
    expect(str).to.equal(`${stringField[0]}=${stringField[1]}^OR${numberField[0]}=${numberField[1]}`)
  })
  it('should handle new queries', () => {
    const str = Query.field(<any>stringField[0])
      .to.equal(stringField[1])
      .elseIf(<any>numberField[0]).to.equal(numberField[1])
      .get();
    expect(str).to.equal(`${stringField[0]}=${stringField[1]}^NQ${numberField[0]}=${numberField[1]}`)
  })
})