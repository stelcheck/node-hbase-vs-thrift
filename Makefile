test:
	@echo "------------------"
	@echo "node-hbase (REST)"
	@echo "------------------"
	node hbase
	@echo "------------"
	@echo "node-thrift"
	@echo "------------"
	node thrift
	@echo "------------"
	@echo "node-hbase-client"
	@echo "------------"
	node node-hbase
