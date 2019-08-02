import React, {useRef, useEffect} from 'react'
import { scaleLinear, min, max, axisBottom, axisLeft, select, area } from 'd3'

var data = [
  { x: 0, y: 10, },
  { x: 1, y: 15, },
  { x: 2, y: 35, },
  { x: 3, y: 20, },
];

export default function Area() {

  const canvas = useRef(null)

  const margin = {top: 20, right: 20, bottom: 40, left: 50}
  const width = 575 - margin.left - margin.right
  const height = 350 - margin.top - margin.bottom;

  useEffect(() => {

    const svg = select(canvas.current).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", `translate(${margin.left}, ${margin.top})`)

    const x = scaleLinear().domain([min(data, d => d.x) / 1.05, max(data, d => d.x) * 1.05 ]).range([0, width])

    const y = scaleLinear().domain([min(data, d => d.y) / 1.05, max(data, d => d.y) * 1.05 ]).range([height, 0])

    const xAxisCall = axisBottom(x)
    const xAxis = svg.append('g').attr("class", "x-axis").attr("transform", `translate(0,${height})`)
    const yAxisCall = axisLeft(y)
    const yAxis = svg.append("g").attr("class", "y-axis")

    const areaG = area().x((d) => x(d.x)).y0(height).y1(d => y(d.y))

    svg.append('path').data([data]).attr("class", "area").attr("fill", "lightblue").attr("d", areaG)

    xAxis.call(xAxisCall)
    yAxis.call(yAxisCall)

  })

  return (
    <svg ref={canvas} />
  )
}
