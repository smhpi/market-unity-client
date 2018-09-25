import React , { Component } from 'react';
import CanvasJS from '../lib/canvasjs.min';
class Report extends Component {
    componentDidMount() {
        var chart = new CanvasJS.Chart("chartContainer", {
            title:{
                text:"Overview"
            },
            animationEnabled: true,
           
            data: [
            {     
                type: "column",
                dataPoints: [
                  {y: 25, label: "Dell"  },
                  {y: 12, label: "HP"  },
                  {y: 32, label: "Lenovo"   }

                ]
            }

            ]
        });
    chart.render();
  }
  render() {
    return (
      <div id="chartContainer" style={{height: 450 + "px", width: 100 + "%"}}>
      </div>
    );
  }
}

// ========================================
export default Report;