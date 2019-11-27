import { Query } from "./Query";

Query.field('test').to.equal('value')
  //.and('test').to.not.be.oneOf('a','b')
  //.or('test').to.be.at.least(4)
  .and('test').to.be.between(2,4)
  .get()//?