# FluentSnow

FluentSnow is a pointless fluent api for the ServiceNow encoded queries. Implemented to learn more about how to implement fluent apis for javascript libraries.

## Usage

```#typescript
// returns "sys_id=value"
Query.field("sys_id").to.equal("value").get()

// returns sys_id=value^ORname=John Smith^NQuser_nameCONTAINSjs^name!=John Smith
Query.field("sys_id").to.equal("value)
  .or("name").equal("John Smith")
  .elseIf("sys_id").to.contain("js)
  .and("name").to.not.equal("John Smith")
```