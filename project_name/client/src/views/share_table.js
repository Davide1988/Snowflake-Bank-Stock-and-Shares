const CreateTable = require('../helpers/create_table.js')
const RequestHelper = require('../helpers/request_helper')
const PubSub = require('../helpers/pub_sub.js')

const SharesTable = function(data,table){
    this.data = data;
    this.table = table;

    console.log(this.data);

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
                    // { name:"Sell", index:this.icon()}
                ]

            });
            this.data.forEach ((element) => {
              const deleteButton = document.createElement('button')
                deleteButton.textContent = "Sell Shares"
                deleteButton.type = "button"
                deleteButton.value = element._id
                deleteButton.classList.add('deleteButton')
                this.table.appendChild(deleteButton)

                deleteButton.addEventListener('click', (evt) => {
                  this.table.innerHTML = "Shares sold"
                  PubSub.publish('SharesRenderView:Shares:id', evt.target.value)
            })
        })
      }

        // SharesTable.prototype.icon = function () {
        //
        //   const icon = document.createElement('a')
        //   icon.textContent = "Delete"
        //   return icon
        //
        // };
        //
        // SharesTable.prototype.delete= function () {
        //   const deleteButton = document.createElement('button')
        //   deleteButton.textContent = "Sell Shares"
        //   deleteButton.type = "button"
        //   deleteButton.value = this.data._id
        //   console.log(this.data);
        //   console.log(deleteButton);
        //   return deleteButton
        //
        // };


  module.exports = SharesTable;
