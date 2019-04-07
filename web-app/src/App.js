import React from 'react';
import { serverResponse, sendOrder, getOrders } from './request';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

am4core.useTheme(am4themes_animated);

class App extends React.Component {
    constructor (props) {
		super(props);
		this.state = {
			arrayOrders: null,
            data: null,
            name: null,
            quantity: null,
            price: null,
            type: null
		};
		this.onSendOrder = this.onSendOrder.bind(this);
	}

    onSendOrder() {
		this.setState({ data: serverResponse(sendOrder(this.state.name, this.state.quantity, this.state.price, this.state.type)) });
	}

    componentWillMount() {
        this.setState({ arrayOrders: serverResponse(getOrders()) });
    }

    componentDidMount() {
        //chart line
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);

        let chart1 = am4core.create("chartdiv1", am4charts.XYChart);
        chart1.paddingRight = 20;

        chart1.data = generateChartData(this.state.arrayOrders);

        let dateAxis = chart1.xAxes.push(new am4charts.DateAxis());
        dateAxis.baseInterval = {
          "timeUnit": "minute",
          "count": 1
        };
        dateAxis.tooltipDateFormat = "HH:mm:ss, d MMMM";

        let valueAxis1 = chart1.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.tooltip.disabled = true;

        let series1 = chart1.series.push(new am4charts.LineSeries());
        series1.dataFields.dateX = "date";
        series1.dataFields.valueY = "visits";
        series1.tooltipText = "Price: [bold]{valueY}[/]";
        series1.fillOpacity = 0.3;

        chart1.cursor = new am4charts.XYCursor();
        chart1.cursor.lineY.opacity = 0;
        chart1.scrollbarX = new am4charts.XYChartScrollbar();
        chart1.scrollbarX.series.push(series1);

        chart1.events.on("datavalidated", function () {
            dateAxis.zoom({start:0.8, end:1});
        });

        chart1.fill = am4core.color("blue").lighten(0.5);


        function generateChartData(orders) {
            let chartData = [];
            let n = orders.length;
            let firstDate = new Date();
            firstDate.setMinutes(firstDate.getDate() - n);
            let visits;
            for (let i = 0; i < n; i++) {
                let newDate = new Date(firstDate);

                let h = orders[i].time[0] + orders[i].time[1];
                let m = orders[i].time[3] + orders[i].time[4];
                let s = orders[i].time[6] + orders[i].time[7];
                newDate.setMinutes(parseInt(m, 10));
                newDate.setHours(parseInt(h, 10));
                newDate.setSeconds(parseInt(s, 10));

                visits = orders[i].price;
                chartData.push({
                    date: newDate,
                    visits: visits
                });
            }
            return chartData;
        }
        var data = [];

        for (let i = 0; i < this.state.arrayOrders.length; i++) {
          let value = this.state.arrayOrders[i].price;
          let qua = this.state.arrayOrders[i].quantity;
          data.push({ value: qua, category: value });
        }

        let interfaceColors = new am4core.InterfaceColorSet();

        let chart2 = am4core.create("chartdiv2", am4charts.XYChart);

        chart2.data = data;
        chart2.bottomAxesContainer.layout = "horizontal";
        chart2.bottomAxesContainer.reverseOrder = true;

        let categoryAxis = chart2.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.stroke = interfaceColors.getFor("background");
        categoryAxis.renderer.grid.template.strokeOpacity = 1;
        categoryAxis.renderer.grid.template.location = 1;
        categoryAxis.renderer.minGridDistance = 20;

        let valueAxis2 = chart2.xAxes.push(new am4charts.ValueAxis());
        valueAxis2.tooltip.disabled = true;
        valueAxis2.renderer.baseGrid.disabled = true;
        valueAxis2.marginRight = 3;
        valueAxis2.renderer.gridContainer.background.fill = interfaceColors.getFor("alternativeBackground");
        valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;
        valueAxis2.renderer.grid.template.stroke = interfaceColors.getFor("background");
        valueAxis2.renderer.grid.template.strokeOpacity = 1;

        let series2 = chart2.series.push(new am4charts.ColumnSeries());
        series2.dataFields.categoryY = "category";
        series2.dataFields.valueX = "value";
        series2.xAxis = valueAxis2;
        series2.name = "Series";
        let bullet = series2.bullets.push(new am4charts.CircleBullet());
        bullet.fillOpacity = 0;
        bullet.strokeOpacity = 0;
        bullet.tooltipText = "{valueX.value}";
    }

    render() {
        return (
            <React.Fragment>
                <div className="general">
                    <div className="top">
                        <div className="chart">
                            <div id="chartdiv1"></div>
                        </div>
                        <div className="order">
                            <div id="chartdiv2"></div>
                        </div>
                    </div>
                    <div className="title gradient gradient_cold">{this.state.data !== null ? 'Оффер номер: ' + this.state.data : 'Buy / sell'}</div>
                    <div className="bottom">
                        <div className="form">
                            <input className="input" type="text" name="name" placeholder="Наименование" onChange={(e)=>{this.setState({ name: e.target.value })}}/>
                            <input className="input" type="number" name="quantity" placeholder="Количество" onChange={(e)=>{this.setState({ quantity: e.target.value })}}/>
                            <input className="input" type="number" name="price" placeholder="Цена" onChange={(e)=>{this.setState({ price: e.target.value })}}/>
                            <input className="input" type="text" name="type" placeholder="Тип" onChange={(e)=>{this.setState({ type: e.target.value })}}/>
                            <button className="btn" onClick={()=>{this.onSendOrder()}}>Отправить</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
