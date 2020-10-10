import d3 from  "d3";

const url: string = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

d3.csv(url).then(function(rows: d3.DSVRowArray) {
    return rows;
})