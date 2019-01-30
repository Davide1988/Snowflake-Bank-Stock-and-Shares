const CreateTable = require('../helpers/create_table.js')
const RequestHelper = require('../helpers/request_helper')
const PubSub = require('../helpers/pub_sub.js')

const SharesTable = function(data,table){
    this.data = data;
    this.table = table;

};



  SharesTable.prototype.getData = function () {

            const newData =  new CreateTable({
                tableDiv: "myTable",
                pager: "pager",
                mockup: this.data,
                rowList: [5, 10, 25, 50],
                colNames: [
                    { name:"Name", index:"name" },
                    { name:"Category", index:"category" },
                    { name:"Symbol", index:"name_share" },
                    { name:"Shares", index:"number_of_shares" },
                ]

            });
      }



  module.exports = SharesTable;
