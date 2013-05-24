var hbase = require('hbase');
var async = require('async');
var assert = require('assert');

var client = new hbase.Client();

var table = client.getTable('t1' )

// var data = require('fs').readFileSync('../daito-ryu.org/images/takeda_sokaku_1.jpg');
var data = "dtrace: error on enabled probe ID 5 (ID 1673: io:mach_kernel:buf_strategy:start): illegal operation in action #3 at DIF offset 0";

async.series([
        function (seriesCb) {
            var count = 0;
            console.time('hbase-write');
            async.whilst(
              function () { return count < 5000; },
              function (cb) {
                  table
                    .getRow('my_row' + count)
                    .put('f2:my_column', data + ' ' + count, function(err, success){

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
                  table
                    .getRow('my_row' + count)
                    .get('f2', function(err, ret){
                        if (ret[0]['$'] !== data + ' ' + count) {
                            console.error('unexpected data ' + count);
                            console.log(data, ret);
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
        });

