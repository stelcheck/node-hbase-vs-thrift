node-hbase vs node-thrift
=========================

Benchmark scripts for testing node-hbase (REST) against node-thrift and node-hbase-client

Libaries used
--------------

* node-hbase: https://github.com/wdavidw/node-hbase
* node-thrift: https://github.com/apache/thrift/tree/trunk/lib/nodejs
* node-hbase-client: https://github.com/falsecz/node-hbase-client

How to run
-----------
npm install

Create table in hbase shell via for example:
create 't1', {NAME => 'f2'}

make test

Results
-------

### Virtualized in virtualbox

* 1 CPU
* 1GB memory

Rest and thrift interface has still SPOF (in interface gateway), native client works as well in cluster mode and from our tests and experience are too much faster (10x) than both gateways. This test compare only one region server with on region.

```
------------------
node-hbase (REST)
------------------
node hbase
hbase-write: 679ms
hbase-write: 5337ms
hbase-write: 5184ms
hbase-write: 5084ms
hbase-write: 4710ms
hbase-write: 4699ms
hbase-read: 7ms
hbase-read: 4315ms
hbase-read: 4191ms
hbase-read: 4101ms
hbase-read: 4231ms
hbase-read: 4141ms
completed
------------
node-thrift
------------
node thrift
hbase-write: 48ms
hbase-write: 2428ms
hbase-write: 2286ms
hbase-write: 1891ms
hbase-write: 2017ms
hbase-write: 1766ms
hbase-read: 63ms
hbase-read: 1357ms
hbase-read: 1064ms
hbase-read: 1086ms
hbase-read: 1200ms
hbase-read: 1039ms
completed
------------
node-hbase-client
------------
node node-hbase
hbase-write: 52ms
hbase-write: 725ms
hbase-write: 857ms
hbase-write: 890ms
hbase-write: 988ms
hbase-write: 987ms
hbase-read: 2ms
hbase-read: 464ms
hbase-read: 609ms
hbase-read: 664ms
hbase-read: 625ms
hbase-read: 606ms
completed
```
