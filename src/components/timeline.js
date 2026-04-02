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
    new Date("2020-01-01"),
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

  svg.selectAll('.event-line')
      .attr('x1', d => newX(d.date))
      .attr('x2', d => newX(d.date))

  svg.selectAll('.event-dot')
    .attr('cx', d => newX(d.date))

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
    //console.log('events:', events.length)
    //console.log('metrics:', metrics.length)

    const parseDate = d3.timeParse('%d/%m/%Y')

    const parsedEvents = events.map(e => ({
      ...e,
      date: parseDate(e.date)
    })).filter(e => e.date !== null)

    console.log('parsed events:', parsedEvents.length)
    console.log('sample:', parsedEvents[0])

  function renderEvents(events) {

    const height = +svg.attr('height')
    const width = +svg.attr('width')

    const eventsGroup = svg.append('g').attr('class', 'g-events')

   const importanceHeight = { low: 30, medium: 60, high: 100 }
    const importanceColor = {
      low: '#0088FF',
      medium: '#FFCC00',
      high: '#FF383C'
    }

    eventsGroup.selectAll('.event-line')
      .data(parsedEvents)
      .enter()
      .append('line')
      .attr('class', 'event-line')
      .attr('x1', d => x(d.date))
      .attr('x2', d => x(d.date))
      .attr('y1', d => height - margin.bottom - (importanceHeight[d.importance] || 10))
      .attr('y2', d => height - margin.bottom)
      .attr('stroke', d => importanceColor[d.importance] || '#ccc')
      .attr('stroke-width', 1)

    eventsGroup.selectAll('.event-dot')
      .data(parsedEvents)
      .enter()
      .append('circle')
      .attr('class', 'event-dot')
      .attr('cx', d => x(d.date))
      .attr('cy', d => height - margin.bottom - (importanceHeight[d.importance] || 10))
      .attr('r', d => d.importance === 'high' ? 4 : d.importance === 'medium' ? 3 : 2)
      .attr('fill', d => importanceColor[d.importance] || '#ccc')

      const tooltip = d3.select('#tooltip')

      eventsGroup.selectAll('.event-dot')
        .on('mouseover', function(event, d) {
          d3.select(this).attr('r', 7)
          tooltip
            .style('opacity', 1)
            .html(`
              <div class="tt-head">${d.event}</div>
              <div class="tt-row">
                <span>Date</span>
                <span class="tt-val">${d.date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
              </div>
              <div class="tt-row">
                <span>Zone</span>
                <span class="tt-val">${d.zone}</span>
              </div>
              <div class="tt-row">
                <span>Actual</span>
                <span class="tt-val">${d.actual || '—'}</span>
              </div>
              <div class="tt-row">
                <span>Forecast</span>
                <span class="tt-val">${d.forecast || '—'}</span>
              </div>
              <div class="tt-row">
                <span>Previous</span>
                <span class="tt-val">${d.previous || '—'}</span>
              </div>
            `)
        })
        .on('mousemove', function(event) {
          tooltip
            .style('left', (event.pageX + 14) + 'px')
            .style('top', (event.pageY - 10) + 'px')
        })
        .on('mouseleave', function(event, d) {
          d3.select(this).attr('r', d.importance === 'high' ? 4 : d.importance === 'medium' ? 3 : 2)
          tooltip.style('opacity', 0)
        })
  }

  renderEvents(events)
   } catch (error) {
      console.error("Could not load the data:", error);
    }
}
loadData();
}