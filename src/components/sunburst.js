import * as d3 from 'd3'
import { skills } from '../data/skills.js'

const size = 600
const radius = size / 2

const root = d3.hierarchy(skills)
  .sum(d => d.children ? 0 : 1)

const partition = d3.partition()
  .size([2 * Math.PI, radius])

partition(root)

const arc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1)

const color = d3.scaleOrdinal()
  .domain(skills.children.map(d => d.name))
  .range(['#4e9af1', '#e06c8a', '#e8c547', '#4fc4cf', '#7c6af7'])

const svg = d3.select('#sunburst')
  .append('svg')
  .attr('viewBox', `0 0 ${size} ${size}`)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .style('width', '100%')
  .style('height', 'auto')
  .style('display', 'block')
  .append('g')
  .attr('transform', `translate(${radius},${radius})`)

svg.selectAll('path')
  .data(root.descendants())
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', d => {
    if (d.depth === 0) return 'white'
    let node = d
    while (node.depth > 1) node = node.parent
    return color(node.data.name)
  })
  .attr('stroke', 'white')
  .attr('stroke-width', 2)

// create tooltip
const tooltip = d3.select('body')
  .append('div')
  .attr('class', 'sunburst-tooltip')
  .style('opacity', 0)

// add hover
svg.selectAll('path')
  .on('mouseover', function(event, d) {
    d3.select(this).attr('opacity', 0.7)
    tooltip
      .style('opacity', 1)
      .html(d.data.name)
  })
  .on('mousemove', function(event) {
    tooltip
      .style('left', (event.pageX + 12) + 'px')
      .style('top', (event.pageY - 40) + 'px')
  })
  .on('mouseleave', function() {
    d3.select(this).attr('opacity', 1)
    tooltip.style('opacity', 0)
  })