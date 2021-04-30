// @TODO: YOUR CODE HERE!
var svgWidth = 700;
var svgHeight = 500;

var margin = {
    top: 20,
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
d3.csv("assets/data/data.csv").then(function (healthData, err) {
    if (err) throw err;
    // console.log(healthData);

    // parse data
    healthData.forEach(function (data) {
        data.smoke = +data.smoke;
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare
    })
});

// scale 
var xLinearScale = d3.scaleLinear()
    .domain([9, d3.max(healthData, d => d.poverty)])
    .range([0, width]);

var yLinearScale = d3.scaleLinear()
    .domain([9, d3.max(healthData, d => d.smokes) * 2.9])
    .range([height, 0]);
console.log(d3.extent(healthData, d => d.smokes));

// axis functions 
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// append axes to chart
var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);

// create circles

var circlesGroup = chartGroup.selectAll("circle")
.data(healthData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.smokes))
.attr("r","8")
.attr("fill", "blue")
.attr("opactity", ".5")
