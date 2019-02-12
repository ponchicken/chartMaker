export const style = {
  axis: {
    line: `stroke: rgba(255,255,255,.3);`,
    path: `stroke: rgba(255,255,255,.3);`,
    text: `
      fill: #eee;
      font-size: 16px;
    `
  },
  xAxisText: `
    transform: translate(0, 10px);
  `,
  yAxisText: `
    transform: translate(-10px, 0);
  `
}

export default `
.axis line {
  stroke: rgba(255,255,255,.3);
}
.axis path {
  stroke: rgba(255,255,255,.3);
}
.axis text {
  fill: #eee;
  font-size: 16px;
}
.axis.x text {
  transform: translate(0, 10px);
}
.axis.y text {
  transform: translate(-10px, 0);
}
`
