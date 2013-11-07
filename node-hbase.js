var async = require('async');
var assert = require('assert');
var config = require('./config.js');
var HBase = require('hbase-client');
var util = require('util');

var client = HBase.create({
	zookeeperHosts: config.ZOOKEEPER_QUORUM
});

var data = "dtrace: error on enabled probe ID 5 (ID 1673: io:mach_kernel:buf_strategy:start): illegal operation in action #3 at DIF offset 0";

async.series([
        function (seriesCb) {
            var count = 0;
            console.time('hbase-write');
            async.whilst(
              function () { return count < 5000; },
              function (cb) {
					  client.putRow('t1','my_row' + count,{'f2:my_column':data + ' ' + count},function(err){
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
					  client.getRow('t1','my_row' + count,['f2:my_column'], function(err,ret){
							if (ret['f2:my_column'].toString() !== data + ' ' + count) {
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
				//@todo implement disconnect() method
				process.exit(0);
        });

