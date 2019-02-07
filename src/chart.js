import * as d3 from 'd3'
import jsdom from 'jsdom'
import moment from 'moment'
import styles from './styles'
moment.locale('ru')

const { JSDOM } = jsdom
const { document } = (new JSDOM()).window
const body = d3.select(document).select('body')
const colors = {
  main: '#039BE6'
}

export const chart = ({
  data,
  width: _width = 1280,
  height: _height = 720,
}) => {
  data = data.sort((a, b) => a.x - b.x)
  const values = data.map(item => item.y)
  const times = data.map(item => item.x)

  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  const padding = 80
  const chartWidth = _width - padding * 2
  const chartHeight = _height - padding * 2
  
  const stepWidth = Math.round(chartWidth / (data.length - 1))

  const coords = values.map((item, i) => ({
    x: stepWidth * i,
    y: item
  }))

  // svg doc
  const svg = body.append('svg')
    .attr('width', _width)
    .attr('height', _height)

  const scales = {
    x: d3.scalePoint()
      .domain(times)
      .range([0, chartWidth]),
    y: d3.scaleLinear()
      .domain([maxValue, 0])
      .range([0, chartHeight])
  }

  const getX = coord => padding + coord.x
  const getY = coord => padding + scales.y(coord.y)
  
  var xAxis = d3.axisBottom(scales.x).tickFormat((x) => moment.unix(x).format('DD.MM HH:mm'))
  var yAxis = d3.axisLeft(scales.y)

  svg
    .append('style')
    .html(styles)

  // axis
  svg
    .append('g')
    .attr("class", "axis x")
    .attr('stroke-width', 1)
    .attr('transform', `translate(${padding}, ${padding + chartHeight})`)
    .call(xAxis)

  svg
    .append('g')
    .attr("class", "axis y")
    .attr('stroke-width', 1)
    .attr('transform', `translate(${padding}, ${padding})`)
    .call(yAxis)

  const chartLineGenerator = d3.line().x(getX).y(getY).curve(d3.curveNatural)
  // chart line
  svg
    .append('path')
    .attr('class', 'chartLine')
    .attr('d', chartLineGenerator(coords))
    .attr('stroke', colors.main)
    .attr('stroke-width', 2)
    .attr('fill', 'rgba(0,0,0,.2)')

  // chart dot circles
  svg
    .selectAll('circle.point')
    .data(coords)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('cx', getX)
    .attr('cy', getY)
    .attr('r', 2)
    .attr('stroke-width', 2)
    .style('stroke', colors.main)
    .style('fill', '#eee')

  return svg.node().outerHTML
}
