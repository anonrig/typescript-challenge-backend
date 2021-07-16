# NOTES

## Changes

- Changed `express` with `fastify` due to performance and input validation ease.
- Changed `mongo` package with `mongodb` package since, I don't know what `mongo` package is. Mongodb pkg is the officially supported one afaik.
- Used cursor pagination with `_id` field
- Achieved 100% test coverage

```
> typescript-challenge-backend@1.0.0 lint:fix
> eslint src/ --ext .js,.jsx,.ts,.tsx --fix

 PASS  src/routes/reviews.test.ts
 PASS  src/routes/stays.test.ts (6.839 s)
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |   95.52 |    86.96 |   85.71 |     100 |
 src         |     100 |    66.67 |     100 |     100 |
  config.ts  |     100 |       75 |     100 |     100 | 14
  logger.ts  |     100 |       50 |     100 |     100 | 4
  server.ts  |     100 |      100 |     100 |     100 |
 src/db      |   84.21 |    66.67 |      75 |     100 |
  index.ts   |   84.21 |    66.67 |      75 |     100 | 31
 src/routes  |     100 |      100 |     100 |     100 |
  index.ts   |     100 |      100 |     100 |     100 |
  reviews.ts |     100 |      100 |     100 |     100 |
  stays.ts   |     100 |      100 |     100 |     100 |
-------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        7.156 s
Ran all test suites.
```

## Issues Faced

- Bottlenecks:
Sort exceeded memory limit of 33554432 bytes, but did not opt in to external sorting.
