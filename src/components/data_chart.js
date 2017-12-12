import React, { Component } from 'react'
import Request from 'superagent'
import { Bar, Pie, Line, Doughnut, Scatter, HorizontalBar, Radar, Polar, Bubble } from 'react-chartjs-2'


var femaleCount = []
var countryList = []
var defaultStyle = {
    minWidth: '25%', height: '400px', float: 'left',
    border: '1px solid #d2d2d2', background: '#fff', borderRadius: '2px'
}

var defaults = {
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'Popolation of Women in respective countries',
        fontSize: 25
    },
    legend: {
        display: true,
        position: 'top'
    }
}

class DataChart extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {},
            loading: true

        }
    }
    componentWillMount() {
        this.callApi().then(response => {
            this.setState({
                chartData: response.chartData,
                loading: false
            })
        })
    }

    callApi() {
        var url = "https://api.population.io/1.0/population/1980/aged/18/"
        return Request.get(url).then((response) => {
            let data = [];
            let labels = response.body.slice(0, 5).reduce((countries, c) => {
                data.push(c.total)
                return countries.concat(c.country)
            }, []);

            return {
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Population',
                            data: data,
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)'
                            
                        }
                    ]
                }

            }
        })
    }

    render() {
        if (this.state.loading) {
            console.log('This happens 4th - when waiting for data.');
            return <h2>Loading...</h2>;
          }

        return (
            <div>
                <section>
                    <h3>
                        World Population Overview Dashboard
                        </h3>
                </section>
                <div className="chart" style={defaultStyle}>
                    <Bar
                        width={100}
                        height={50}
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
                <div className="chart" style={defaultStyle}>
                    <Pie
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
                <div className="chart" style={defaultStyle}>
                    <Line
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
                <div className="chart" style={defaultStyle}>
                    <Doughnut
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
                <div className="chart" style={defaultStyle}>
                    <HorizontalBar
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
                <div className="chart" style={defaultStyle}>
                    <Radar
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
                <div className="chart" style={defaultStyle}>
                    <Polar
                        data={this.state.chartData}
                        options={defaults}
                    />
                </div>
            </div>
        );
    }
}
export default DataChart;