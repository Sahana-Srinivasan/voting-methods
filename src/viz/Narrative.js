/** @jsx jsx */
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Scrollama, Step } from 'react-scrollama';
import { select, selectAll, mouse } from 'd3-selection';
import { csv } from 'd3-fetch';
import { path } from 'd3-path';
import { scaleOrdinal } from 'd3-scale';
import { transition } from 'd3-transition';
import { nest } from 'd3-collection';
import d3Tip from 'd3-tip';

const d3 = { select, selectAll, mouse, csv, path, scaleOrdinal, transition,
         nest };


const descriptions = {
  'Motivation': 'this is the first description',
  'FPTP': 'this is the second description',
  'con 1': 'this is the third description',
  'example 1': 'this is the fourth description',
  'con 2': 'this is the fifth description',
  'example 2': 'this is the sixth description'
}


const narrativeStyle = css`
  .main {
    padding: 60vh 2vw;
    display: flex;
    justify-content: space-between;
  }

  .graphic {
    flex-basis: 50%;
    position: sticky;
    top: 160px;
    width: 100%;
    height: 300px;
    align-self: flex-start;
    background-color: #F0FFFF;
  }

  .data {
    font-size: 5rem;
    text-align: center
  }

  .scroller {
    flex-basis: 30%;
  }

  .step {
    padding-top: 200px;
    padding-bottom: 200px;
    '&:last-child': {
      margin-bottom: 0;
    }
  }
`;

export default class Narrative extends Component {
  constructor(props) {
    super(props);
    const stories = ['Motivation', 'FPTP', 'con 1', 'example 1', 'con 2', 'example 2']
    this.state = {
      data: 0,
      stories: stories,
      steps: [...stories.keys()], // ... is array destructuring operator
      progress: 0,
      initialized: false,
    }
  }

  onStepEnter = ({ element, data }) => {
    element.style.backgroundColor = 'lightgoldenrodyellow';
    this.setState( { data });
  }

  onStepExit= ({ element }) => {
    element.style.backgroundColor = '#fff';
  }



  onStepProgress = ({ element, progress }) => {
    this.setState({ progress });
  }

  componentDidMount() {
    this.initialize();
  }

  draw(points, ctx) {
    ctx.save();
    for (let i = 0; i < points.length; ++i) {
      const point = points[i];
      const radius = 2;
      ctx.beginPath();
      ctx.arc (point.x, point.y, radius, 0, 2*Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = "#cccccc";
      ctx.fill()
    }

    ctx.restore();

  }

  initialize() {
    console.log('hello got here')

    // thanks xisabao
    var parentWidth = d3
      .select('.graphic')
      .node()
      .getBoundingClientRect().width;


    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const width = parentWidth - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;


    // const points = []
    // let point = [];
    // point.push({x: 50, y: 50})
    // points.push(point);
    // let point2 = [];
    // point2.push({x: 60, y: 60})
    // points.push(point2);
    // let point3 = [];
    // point3.push({x: 70, y: 70})
    // points.push(point3);
    // let point4 = [];
    // point4.push({x: 80, y: 80})
    // points.push(point4);
    // let point5 = [];
    // point5.push({x: 90, y: 90})
    // points.push(point5);

    var svg = d3.select("#viz")
                .append('svg')
                .attr('width', width)
                .attr('height', height);

    svg.selectAll("circle")
    .data([[32, 50], [87, 30], [112, 91], [150, 50]])
    .enter().append("circle")
    .attr("cy", function(d) {return d[0]})
    .attr("cx", function(d, i) { return d[1] })
    .attr("r", function(d) { return Math.sqrt(d[0]); })
    .style("fill", "purple");





    this.setState({initialized: true});



}



  render() {
    const { data, steps, progress } = this.state;


    return (
      <div css={narrativeStyle}>
      <div className='main'>
        <div className='graphic'>
          <div id="viz"></div>
        </div>
        <div className='scroller'>
          <Scrollama
            onStepEnter={this.onStepEnter}
            onStepExit={this.onStepExit}
            progress
            onStepProgress={this.onStepProgress}
            offset={0.33}
            debug
          >
            {steps.map ( value => (
              <Step data={value} key={value}>
                <div className='step'>
                  <p>{descriptions[this.state.stories[value]]}</p>
                </div>
              </Step>
            ))}
          </Scrollama>
         </div>
      </div>
      </div>
      )
  }
}
