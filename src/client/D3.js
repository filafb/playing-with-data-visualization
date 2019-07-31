import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'


var data0 = [
  { gpa: 3.42, height: 138 },
  { gpa: 3.54, height: 153 },
  { gpa: 3.14, height: 148 },
  { gpa: 2.76, height: 164 },
  { gpa: 2.95, height: 162 },
  { gpa: 3.36, height: 143 }
]

var data1 = [
  { gpa: 3.15, height: 157 },
  { gpa: 3.12, height: 175 },
  { gpa: 3.67, height: 167 },
  { gpa: 3.85, height: 149 },
  { gpa: 2.32, height: 165 },
  { gpa: 3.01, height: 171 },
  { gpa: 3.54, height: 168 },
  { gpa: 2.89, height: 180 },
  { gpa: 3.75, height: 153 }
]



export default function D3() {
  const [ flag, setData ] = useState(true)
  const canvas = useRef(null)

  useEffect(() => {

    let data = flag ? data0 : data1

    const svg = d3.select(canvas.current)

    const margin = {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50
    }

    const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

    const width = +svg.attr('width')- margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom

    const x = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.gpa) /1.05, d3.max(data, (d) => d.gpa) * 1.05]).range([0, width])



    const y = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.height) / 1.05, d3.max(data, (d) => d.height) * 1.05]).range([height, 0])

    const xAxisCall = d3.axisBottom(x)
    const xAxis = g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${0},${height})`)

    const yAxisCall = d3.axisLeft(y)
    const yAxis = g.append("g")
      .attr("class", "y-axis")


    xAxis.append("text")
      .attr("class", "axis-title")
      .attr("transform", `translate(${width}, 0)`)
      .attr("y", -6)
      .text("Grade Point Average")

    yAxis.append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 16)
      .text("Height / Centimeters")

    const t = d3.transition().duration(750)

    const circles = svg.selectAll("circle").data(data)
    circles.exit().transition(t).attr("fill-opacity", 0.1).attr("cy", y(0)).remove()

    circles.transition(t)
    .attr("cx", function(d){ return x(d.gpa) })
    .attr("cy", function(d){ return y(d.height) })


    circles.enter()
    .append("circle")
    .attr("cx", (d) => x(d.gpa))
    .attr("cy", (d) => y(d.height))
    .attr("r", 5)
    .attr("fill", "gray")
    .attr("fill-opacity", 0.1)
    .transition(t)
    .attr("fill-opacity", 1)
    .attr("cy", (d) => y(d.height))

      xAxis.transition(t).call(xAxisCall);
      yAxis.transition(t).call(yAxisCall)

  }, [flag])
  return (
    <React.Fragment>
      <svg height="500" width="800" ref={canvas} />
      <button onClick={() => setData(!flag)}>change data</button>
    </React.Fragment>
  )
}
