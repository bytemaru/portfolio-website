import * as d3 from 'd3';

const chartEl = document.getElementById('chart')

if (chartEl) {

const margin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 40
};

const aspectRatio = 16 / 5;

const container = d3.select("#chart");

const svg = container
  .append("svg")
  .style("display", "block")
  .style("width", "100%")
  .style("border", "1px solid #ccc");

const gx = svg.append("g");

const x = d3.scaleTime()
  .domain([
    new Date("2010-01-01"),
    new Date("2025-12-31")
  ]);

const zoom = d3.zoom()
  .on("zoom", zoomed)

function getAdaptiveAxis(scale) {
  const [start, end] = scale.domain();
  const spanMs = end - start;

  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonthApprox = oneDay * 30;
  const oneYearApprox = oneDay * 365;

  const spanDays = spanMs / oneDay;

  if (spanDays > 365 * 3) {
    return d3.axisBottom(scale)
      .ticks(d3.timeYear.every(1))
      .tickFormat(d3.timeFormat("%Y"));
  }

  if (spanDays > 90) {
    return d3.axisBottom(scale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%b %Y"));
  }

  if (spanDays > 30) {
    return d3.axisBottom(scale)
      .ticks(d3.timeWeek.every(1))
      .tickFormat(d3.timeFormat("%d %b"));
  }

  return d3.axisBottom(scale)
    .ticks(d3.timeDay.every(1))
    .tickFormat(d3.timeFormat("%d %b"));
}

function zoomed(event) {

  const newX = event.transform.rescaleX(x);

  gx.call(getAdaptiveAxis(newX));

}

function render() {
  const containerNode = container.node();
  const width = containerNode.offsetWidth;
  const height = width / aspectRatio;
  console.log('width:', width)  // ← add this

  svg
    .attr("width", width)
    .attr("height", height);

  x.range([margin.left, width - margin.right]);

  gx
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(getAdaptiveAxis(x));

  zoom
    .scaleExtent([1, 40])
    .translateExtent([[0, 0], [width, height]]);

  svg.call(zoom);
}

requestAnimationFrame(render)
window.addEventListener("resize", render)

//console.log(document.querySelector("#chart").offsetWidth)

/*Adding data into the visual*/

async function loadData() {
  try {
    const [events, metrics] = await Promise.all([
        d3.json('/data/events.json'),
        d3.json('/data/silver_housing_affordability.json')
    ])
    console.log('events:', events.length)
    console.log('metrics:', metrics.length)


  } catch (error) {
    console.error("Could not load the data:", error);
  }
}

loadData();
}