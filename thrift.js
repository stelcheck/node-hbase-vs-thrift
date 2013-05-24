var thrift = require('thrift');
var async = require('async');

var HBase = require('./gen-nodejs/Hbase'),
    HBaseTypes = require('./gen-nodejs/Hbase_types');

var data = "dtrace: error on enabled probe ID 5 (ID 1673: io:mach_kernel:buf_strategy:start): illegal operation in action #3 at DIF offset 0";
var connection = thrift.createConnection('localhost', 9090, { transport: thrift.TBufferedTransport });

connection.on('connect', function () {
    client = thrift.createClient(HBase, connection);

    async.series([
        function (seriesCb) {
            var count = 0;
            console.time('hbase-write');
            async.whilst(
              function () { return count < 5000; },
              function (cb) {
                  client
                    .mutateRow('t1', 'my_row' + count, [new Mutation({column: 'f2:my_column', value: data + ' ' + count})], null, function(err, success){

                        if (err) {
                            console.log(err);
                        }

                        if (count % 1000 === 0) {
                            console.timeEnd('hbase-write');
                            console.time('hbase-write');
                        }

                        count++;
                        cb();
                    });
              },
              function () {
                console.timeEnd('hbase-write');
                seriesCb();
              });
        },
        function (seriesCb) {
            var count = 0;
            console.time('hbase-read');
            async.whilst(
              function () { return count < 5000; },
              function (cb) {
                  client
                    .get('t1', 'my_row' + count, 'f2', null, function(err, ret) {
                        if (ret[0].value !== data + ' ' + count) {
                            console.error('unexpected data ' + count);
                            console.log(data);
                            console.log(ret[0].value);
                        }

                        if (count % 1000 === 0) {
                            console.timeEnd('hbase-read');
                            console.time('hbase-read');
                        }

                        count++;
                        cb();
                    });
              },
              function () {
                console.timeEnd('hbase-read');
                seriesCb();
              });
        }],
        function () {
            console.log('completed');
            connection.end();
        });

});
connection.on('error', function (err) {
    console.error('error', err);
});
