
var table;
var header;
var body;
var pager;
var currentPage = 0;
var pageLength;
var rowNum = 100;
var backPage;
var nextPage;
var selectRowNum;
var actionBar;
var divRowNum;
var divSearch;
var selectSearch;
var inputSearch;
var buttonSearch;

const CreateTable = function (foundation) {
    this.foundation = foundation;
    this.buildTable(foundation.mockup);


}

CreateTable.prototype.buildTable = function(data) {


    this.foundation.data = typeof data == "object" ? data : JSON.parse(data);
    this.pageLength = Math.ceil(this.foundation.data.length / rowNum);
    this.pager = document.getElementById(this.foundation.pager);
    this.backPage = document.createElement('a');
    this.nextPage = document.createElement('a');
    this.table = document.createElement("table");
    this.header = document.createElement("thead");
    this.body = document.createElement("tbody");
    this.selectRowNum = document.createElement("select");

    this.pager.className = "pager";
    this.table.className = "myTable";
    this.selectRowNum.className = "selectRowNum";

    // stop 1
    // this.buildActionBar();
    //

    this.constructTHead(this.foundation.colNames, this.header);

    this.foundation.data.map((item) => {

        var row = document.createElement("tr");
        this.foundation.colNames.forEach(function (name) {
            var col = document.createElement("th");
            col.innerText = item[name.index];
            row.appendChild(col);
        });

        this.body.appendChild(row);
        this.table.appendChild(this.body);
        item.row = row;
        return item;
    });

    this.constructTBody(this.foundation.data, this.foundation.colNames, this.foundation.tableDiv);
// stop 2
    // this.constructPager();
//
    this.table.appendChild(this.header);
    this.table.appendChild(this.body);
    document.getElementById(this.foundation.tableDiv).appendChild(this.table);
}

CreateTable.prototype.clearRows = function() {
    this.foundation.data.forEach((item) => {
        item.row.style.display = "none";
    });
}

CreateTable.prototype.constructTHead = function(colNames, header) {
    var row = document.createElement("tr");
    colNames.forEach(function (column) {
        var col = document.createElement("th");
        col.innerText = column.name;
        col.onclick = (e) => {
            eventClickTHeadOrder(e.target, column.index);
            clearRows(this.foundation.tableDiv);
            constructTBody(this.foundation.data, this.foundation.colNames, this.foundation.tableDiv);
        };
        row.appendChild(col);
        header.appendChild(row);
    });
}

CreateTable.prototype.constructTBody = function(data, colNames, tableDiv) {
    this.clearRows(tableDiv);

    for (var x = currentPage * rowNum; x < data.length && x < (currentPage + 1) * rowNum; x++) {
        data[x].row.style.display = "";
        if (this.foundation.data.length <= this.pageLength || this.currentPage >= Math.ceil(this.foundation.data.length / this.pageLength) - 1) {
            this.nextPage.disabled = true;
        }
        this.nextPage.disabled = true;
    }
}

CreateTable.prototype.constructPager = function() {
    this.pager.innerHTML = "";

    this.backPage.innerText = "<<";
    this.backPage.id = "btnBack";
    this.backPage.onclick = () => {
        if (currentPage > 0) {
            currentPage--;
            alterPagerEvent();
            constructTBody();
        }
    };

    this.nextPage.innerText = '>>';
    this.nextPage.id = "nextPage";
    this.nextPage.onclick = () => {
        if (currentPage < (pageLength - 1)) {
            currentPage++;
            alterPagerEvent();
            constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
        }
    };

    this.nextPage.className = (currentPage == (pageLength - 1)) ? "disable" : "";
    this.backPage.className = (currentPage == 0 && backPage) ? "disable" : "";

    this.pager.appendChild(this.backPage);
    for (var i = 0; i < this.pageLength; i++) {
        var pagerNum = document.createElement('a');
        pagerNum.innerText = i + 1;
        pagerNum.id = "pager" + i;
        pagerNum.className = i == this.currentPage ? 'active' : '';
        pagerNum.onclick = function (e) {
            this.eventClickPager(this.foundation.data, this.foundation.colNames, this.foundation.tableDiv, this.innerHTML)
        };
        document.getElementById("pager").appendChild(pagerNum);
    }
    this.pager.appendChild(this.nextPage);
}

CreateTable.prototype.alterPagerEvent = function(curPag) {
    for (var i = 0; i < this.pageLength; i++) {
        var numPage = document.getElementById("pager" + i);
        numPage.className = '';
    }
    var numPage = document.getElementById("pager" + curPag);
    numPage.className = 'active';

    nextPage.className = (currentPage == (pageLength - 1)) ? "disable" : "";
    backPage.className = (currentPage == 0 && backPage) ? "disable" : "";
}

CreateTable.prototype.eventClickPager = function(data, colNames, tableDiv, num) {
    this.currentPage = num - 1;
    console.log(num);
    alterPagerEvent(this.currentPage);
    constructTBody(data, colNames, tableDiv);
}

CreateTable.prototype.eventClickTHeadOrder = function(target, index) {
    if (target.className == "" || target.className == "arrow-down") {
        col = this.table.querySelector("thead");
        col = col.querySelectorAll("th");
        for (i = 0; i < col.length; i++) {
            col[i].className = "";
        }
        col = document.getElementById(index);
        target.className = "arrow-up";
        if (!(!isNaN(parseFloat(this.foundation.data[0][index])) && isFinite(this.foundation.data[0][index]))) {
            this.foundation.data.sort(function (obj1, obj2) {
                return obj1[index] < obj2[index] ? -1 :
                    (obj1[index] > obj2[index] ? 1 : 0);
            });
        } else {
            this.foundation.data.sort((obj1, obj2)=> {
                return (obj1[index] - obj2[index]);
            });
        }
    } else {
        col = this.table.querySelector("thead");
        col = col.querySelectorAll("th");
        for (i = 0; i < col.length; i++) {
            col[i].className = "";
        }
        col = document.getElementById(index);
        target.className = "arrow-down";
        if (!(!isNaN(parseFloat(this.foundation.data[0][index])) && isFinite(this.foundation.data[0][index]))) {
            this.foundation.data.sort(function (obj1, obj2) {
                return obj1[index] < obj2[index] ? 1 :
                    (obj1[index] > obj2[index] ? -1 : 0);
            });
        } else {
            this.foundation.data.sort((obj1, obj2)=> {
                return (obj2[index] - obj1[index]);
            });
        }
    }
}



CreateTable.prototype.search = function(){
    this.buttonSearch.addEventListener('click', () => {
        var prop = this.selectSearch.value;
        var val = this.inputSearch.value;
        data.forEach((linha)=> {
            var valor = linha[prop];
            console.log((valor != null || valor != undefined));
            console.log(linha[prop].indexOf(val));
            console.log(linha[prop].indexOf(val) < 0);
            console.log((valor != null || valor != undefined) && linha[prop].indexOf(val) < 0);
            if ((valor != null || valor != undefined) && linha[prop].indexOf(val) < 0) {
                linha.row.style.display = 'none';
            }
            else {
                linha.row.style.display = "";
            }
        });
    });
}

CreateTable.prototype.buildActionBar = function() {
    this.actionBar = document.createElement("div");
    this.divRowNum = document.createElement("div");
    this.divSearch = document.createElement("div");
    this.selectSearch = document.createElement("select");
    this.inputSearch = document.createElement("input");
    this.buttonSearch = document.createElement("button");

    for (var i = 0; i < this.foundation.rowList.length; i++) {
        var option = document.createElement("option");
        option.innerText = this.foundation.rowList[i];
        option.value = this.foundation.rowList[i];
        this.selectRowNum.appendChild(option);
        // this.selectRowNum.add(option, this.selectRowNum.options[i]);
    }

    this.selectRowNum.onchange = () => {
        this.rowNum = this.selectRowNum.options[this.selectRowNum.selectedIndex].value;
        this.pageLength = Math.ceil(this.foundation.data.length / rowNum);
        this.constructPager();
        this.alterPagerEvent();
        this.constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
    };

    this.foundation.colNames.forEach((item) => {
        let option = document.createElement("option");
        option.innerText = item.name;
        option.value = item.index;
        this.selectSearch.appendChild(option);
    });

    this.buttonSearch.innerText = "Pesquisar";
    this.buttonSearch.className = "search-button";
    this.inputSearch.className = "search-input";
    this.selectSearch.className = "search-select";

    this.divRowNum.appendChild(this.selectRowNum);
    this.divSearch.appendChild(this.buttonSearch);
    this.divSearch.appendChild(this.inputSearch);
    this.divSearch.appendChild(this.selectSearch);

    this.divRowNum.className = "divRowNum";
    this.divSearch.className = "search";
    this.actionBar.className = "action-bar";


    this.actionBar.appendChild(this.divRowNum);
    this.actionBar.appendChild(this.divSearch);

    document.getElementById(this.foundation.tableDiv).appendChild(this.actionBar);
    this.search();
}

module.exports = CreateTable;
