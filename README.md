<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test
```

## Swagger

After running `yarn run start`, visit http://localhost:3000/api

## About this project

https://docs.google.com/document/d/11p5C-SaeYhBBI9qbsTLiL9_Wwl7qhVLNB5U8G8isvc4/edit

### Test Task for JS full-stack developer (back-end part).

Make an API with 1 GET method. 

#### General requirements

* Stack - Nest JS or any other JS framework.
* Use version control and publish project in Github.
* JWT authentication and 3 pre-defined users (admin, normal, limited)
* Solution should generate an automated OpenAPI documentation in Swagger or any other engine.
* Use this PostgreSQL database as a data source: https://rnacentral.org/help/public-database

#### Database connection details

* Hostname: hh-pgsql-public.ebi.ac.uk
* Port: 5432
* Database: pfmegrnargs
* User: reader
* Password: NWDMCE5xdipIjRrp

#### Task description

1. Make a GET method /locus
2. Filtering parameters: 
  - Id, int enum (rl table)
  - assemblyId, int, single value (rl table)
  - regionId, enum, (rld table)
  - membershipStatus, varchar,single value (rld table)
3. Add sideloading parameter as enum. Make 1 value in the list - locusMembers
4. Apply pagination parameters with default rows count=1000.
5. Add sorting option of results for couple fields
6. Relations to be defined in models. No raw sql.
7. Permission: admin can access all columns, normal can access only data from rl table and cannot use sideloading, limited user can get data only for regionId in (86118093,86696489,88186467) 
8. Cover solution with some simple tests

Definition of rl and rlm tables in SQL below as SQL statement:

```
SELECT rl.*,rlm.* FROM rnc_locus rl LEFT JOIN rnc_locus_members rlm on rlm.locus_id=rl.id
```

Example of API answer without sideloading (snake_case used in these examples, camelCase is preferred):

```
[
  {
    "id": 3106326,
    "assembly_id": "WEWSeq_v.1.0",
    "locus_name": "cfc38349266a6bc69956bedc917d0edb00069168bf77c8242d50729767e98670@4A/547925668-547987324:1",
    "public_locus_name": "432B32430F9FCBB8",
    "chromosome": "4A",
    "strand": "1",
    "locus_start": 547925668,
    "locus_stop": 547987324,
    "member_count": 259,
  },
  {...},
  {...},
  ...
]
```

Example of API answer with sideloading (snake_case used in these examples, camelCase is preferred):

```
[
  {
    "id":3106352,
    "assembly_id":"Rrox_v1",
    "locus_name":"12b97d958a54d0d01bb023bc95acd722c71a7dd1928a6253af4181bcece31bbe@KN300177.1/1081562-1081689:-1",
    "public_locus_name":"30CA93230012AFC9",
    "chromosome":"KN300177.1",
    "strand":"-1",
    "locus_start":1081562,
    "locus_stop":1081689,
    "member_count":1,
    "urs_taxid":"URS0000A888AB_61622",
    "locus_members":[
      {
        "locus_member_id":3106352,
        "region_id":85682522,
        "locus_id":2470322,
        "membership_status":"member"
      }
    ]
  },
  {...},
  {...},
  ...
]
```




## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
