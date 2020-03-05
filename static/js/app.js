// from data.js
var tableData = data;

//set the variable to hold the table
var tbody = d3.select("tbody");

function buildTable(data){

    //clear existing data
    tbody.html("");
    
    //append a row to the table
    data.forEach(function(dataRow){
        //console.log(ufoSighting);
        var row = tbody.append("tr");

        //add value for each cell  
        Object.entries(dataRow).forEach(function([key, value]){
        //console.log(key,value);
    
            var cell = row.append("td");
            cell.text(value);
        })  
    })
}
buildTable(tableData);

// filter

//keep track of filters

var filters = {};

function filterTable(){
    // set filtered data to tableData
    let filteredData = tableData;

    //loop through filters, keep data that matches filter values
    Object.entries(filters).forEach(function([key,value]){
        filteredData = filteredData.filter((row) => row[key]===value);

    })

    buildTable(filteredData);
}

function updateFilters(){
    //save elements, values and IDs of filters that we changed
    var changeElement = d3.select(this).select("input");
    var elementValue = changeElement.property("value");
    var filterID = changeElement.attr("id");

    //add filterID and value to filter if including, otherwise clear
    if (elementValue){
        filters[filterID] = elementValue;
    }
    else {
        delete filters[filterID];
    }

    //call function to apply all filters and rebuild table
    filterTable()
}

// attach event to listen to changes 
d3.selectAll(".filter").on("change", updateFilters);

buildTable(tableData);




