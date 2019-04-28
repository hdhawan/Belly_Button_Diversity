function buildMetadata(sample) {
  
  console.log("In Building MetaData");
  d3.json(`/metadata/${sample}`).then((data) => {
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(data).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
  console.log("Exiting Building MetaData");
}


function buildCharts(sample) {

console.log("In Build Charts");
d3.json(`/samples/${sample}`).then((data) => {
  var ids = data.otu_ids;
  var labels = data.otu_labels;
  var values = data.sample_values;

  var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "Id's" },
    hovermode: "closest"
    };

    var DataBubble = [
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.plot("bubble", DataBubble, LayoutBubble);

  var pie_data = [
    {
      values: values.slice(0, 10),
      labels: ids.slice(0, 10),
      hovertext: labels.slice(0, 10),
      hoverinfo: "hovertext",
      type: "pie"
    }
  ];

  var pie_layout = {
    margin: { t: 0, l: 0 }
  };

  Plotly.plot("pie", pie_data, pie_layout);
});
console.log("Exiting Build Charts");

}

function init() {

console.log("In function Init");
var selector = d3.select("#selDataset");

d3.json("/names").then((sampleNames) => {
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
});

console.log("Exiting function Init");
}

function optionChanged(newSample) {

  console.log("In option changed");
  buildCharts(newSample);
  buldMetadata(newSample);
  console.log("Exiting option changed");
}

init();