import React from 'react';
import Plot from "react-plotly.js";
import logo from './logo.svg';
import * as math from "mathjs";
// HT: https://stackoverflow.com/questions/45549698/how-to-include-3rd-party-library-that-uses-older-import-approach-to-angular4-x
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

type TraceData = {
  x: Array<number>,
  y: Array<number>,
  name: string
}

type PlotData = {
  traces: Array<TraceData>
}

type PlotLayout = {
  width: number,
  height: number
}

type PlotProps = {
  data: PlotData,
  title: string,
  layout: PlotLayout | null 
}

type PlotState = {}

class ScatterPlot extends React.Component<PlotProps> {

  traces: Array<TraceData>;
  width: number;
  height: number;
  title: string;

  constructor(props: PlotProps) {
    super(props)
    this.traces = this.props.data.traces.map(
      (t: TraceData) => ({
          x: t.x,
          y: t.y,
          name: t.name,
          type: "scatter",
          mode: "lines"
        })
    )
    this.width = this.props.layout != null ? this.props.layout.width : 800
    this.height = this.props.layout != null ? this.props.layout.height : 500
    this.title = this.props.title
  }

  render() {

    return (
      <Plot
        data = {this.traces}
        layout = { {width: this.width, height: this.height, title: this.title} }
      />
    )

  }
}

const support: Array<number> = math.range(-2 * math.pi, 2 * math.pi, 0.1).toArray() as Array<number>
const testSinData: TraceData = {
  x: support,
  y: support.map( (xi: number) => math.sin(xi) ),
  name: "Sine"
}
const testCosData: TraceData = {
  x: support,
  y: support.map( (xi: number) => math.cos(xi) ),
  name: "Cosine"
}

const testPlotData: PlotData = { traces: [testSinData, testCosData] }
const testPlotProps: PlotProps = {
  data: testPlotData,
  title: "First (Static) Plot in React",
  layout: null
}

function TestPlot(): JSX.Element {
  return new ScatterPlot(testPlotProps).render();
}

export default TestPlot;
