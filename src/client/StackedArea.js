import React, { useRef, useEffect } from 'react'
import { scaleLinear, min, max, axisBottom, axisLeft, select, area, nest, map, stack, extent, scaleOrdinal } from 'd3'

var data = [
  {
    date: "2019-01-01T05:00:00.000Z",
    amount: 10,
    type: 'mercado'
  },
  {
    date: "2019-01-01T05:00:00.000Z",
    amount: 15,
    type: 'mercado'
  },
  {
    date: "2019-01-01T05:00:00.000Z",
    amount: 9,
    type: 'restaurante'
  },
  {
    date: "2019-01-01T05:00:00.000Z",
    amount: 20,
    type: 'restaurante'
  },
  {
    date: "2019-02-01T05:00:00.000Z",
    amount: 21,
    type: 'mercado'
  },
  {
    date: "2019-02-01T05:00:00.000Z",
    amount: 22,
    type: 'mercado'
  },
  {
    date: "2019-02-01T05:00:00.000Z",
    amount: 11,
    type: 'restaurante'
  },
  {
    date: "2019-02-01T05:00:00.000Z",
    amount: 13,
    type: 'restaurante'
  },
  {
    date: "2019-03-01T05:00:00.000Z",
    amount: 19,
    type: 'mercado'
  },
  {
    date: "2019-03-01T05:00:00.000Z",
    amount: 19,
    type: 'mercado'
  },
  {
    date: "2019-03-01T05:00:00.000Z",
    amount: 12,
    type: 'restaurante'
  },
  {
    date: "2019-03-01T05:00:00.000Z",
    amount: 21,
    type: 'restaurante'
  },
];

export default function StackedArea() {

  const canvas = useRef(null)

  const margin = { top: 20, right: 20, bottom: 40, left: 50 }
  const width = 800 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom;

  useEffect(() => {

    const svg = select(canvas.current).attr("width", '100%').attr("height", height + margin.top + margin.bottom).append("g").attr("width", '100%').attr("transform", `translate(${margin.left}, ${margin.top})`)

    const sumstat = nest().key(d => d.date).entries(data)
    const mygroups = map(data, d => d.type).keys()
    const scale = map(data, d => d.date).keys()

    const stackedData = stack().keys(mygroups).value( (d, key) => {
      return d.values.reduce((acc, curr) => {
        if(curr.type === key) {
          return acc + curr.amount
        } else {
          return acc
        }
      },0)
    })(sumstat)

    const x = scaleOrdinal().domain(scale).range([0, width/2, width])
    const xAxisCall = axisBottom(x)
    const xAxis = svg.append('g').attr("class", "x-axis").attr("transform", `translate(0,${height})`)
    xAxis.call(xAxisCall)

    const y = scaleLinear().domain([0, max(sumstat, d => {
      let dataReduced = d.values.reduce((acc, curr) => acc + curr.amount, 0)
      return dataReduced
    }) * 1.1]).range([height, 0])
    const yAxisCall = axisLeft(y)
    const yAxis = svg.append("g").attr("class", "y-axis")
    yAxis.call(yAxisCall)

    const color = scaleOrdinal().domain(mygroups).range(['blue','green'])


    svg.selectAll("mylayers").data(stackedData).enter().append("path").on("click", (d) => console.log(d)).style("fill", (d,i) => {
      return color(mygroups[i])
    }).attr("d", area()
    .x((d) => {
      return x(d.data.key)
    })
    .y0( d => y(d[0]) )
    .y1(d => y(d[1])))

    //svg.append('path').data([stackedData]).attr("class", "area").attr("fill", "lightblue").attr("d", areaG)


  })

  return (
    <svg ref={canvas} />
  )
}
