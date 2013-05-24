node-hbase vs node-thrift
=========================

Benchmark scripts for testing node-hbase (REST) against node-thrift

Libaries used
--------------

* node-hbase: https://github.com/wdavidw/node-hbase
* node-thrift: https://github.com/apache/thrift/tree/trunk/lib/nodejs

How to run
-----------

make test

Results
-------

### OSX 10.7.5

* 2.3 GHz Intel Core i5
* 4GB 133MHz DDR3

```
------------------
node-hbase (REST)
------------------
node hbase
hbase-write: 17ms
hbase-write: 3343ms
hbase-write: 3982ms
hbase-write: 3912ms
hbase-write: 3493ms
hbase-write: 3891ms
hbase-read: 3ms
hbase-read: 3912ms
hbase-read: 3380ms
hbase-read: 3885ms
hbase-read: 4035ms
hbase-read: 3226ms
completed
------------
node-thrift
------------
node thrift
hbase-write: 38ms
hbase-write: 1063ms
hbase-write: 871ms
hbase-write: 899ms
hbase-write: 887ms
hbase-write: 928ms
hbase-read: 2ms
hbase-read: 520ms
hbase-read: 429ms
hbase-read: 472ms
hbase-read: 436ms
hbase-read: 449ms
completed```

