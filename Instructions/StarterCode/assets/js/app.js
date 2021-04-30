// @TODO: YOUR CODE HERE!
var svgWidth = 700;
var svgHeight = 500;

var margin = {
    top:20, 
    right: 40, 
    bottom: 80, 
    left: 100,
};

var width = svgWidth - margin.left - margin.right;
var heiht = svgHeight - margin.top - margin.bottom; 

// creating svg wrapper
var svg = d3
    .select("#scater")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append svg group
var chartGroup = svg.append("g")
.attr("transform", `translates(${margin.left}, ${margin.top})`);

// get data from csv file
d3.csv("assets/data/data.csv").then(function(healthData, err) {
    if (err) throw err;
    console.log(healthData);
})