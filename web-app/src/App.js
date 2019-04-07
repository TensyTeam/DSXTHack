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
            name: 'usd',
            quantity: null,
            price: null,
            type: 'buy'
		};
		this.onSendOrder = this.onSendOrder.bind(this);
	}

    onSendOrder() {
        if(this.state.quantity !== null && this.state.price !== null){
    		this.setState({ data: serverResponse(sendOrder(this.state.name, this.state.quantity, this.state.price, this.state.type)) });
        }
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

        chart1.data = generateChartData(this.state.arrayOrders[0]);

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

        //chart 2
        var data = [];
        var n1 = this.state.arrayOrders[1].length;
        var n2 = this.state.arrayOrders[2].length;

        for (let i = 0; i < n1; i++) {
          let price = Number(this.state.arrayOrders[1][i].price);
          let quantity = Number(this.state.arrayOrders[1][i].quantity);
          if(data.length > 0 && price == data[data.length-1].category) {
              data[data.length-1].value += quantity
          } else
            data.push({ value: quantity, category: price });
        }

        var j = data.length-1;
        n1 = data.length;

        for (let i = 0; i < n2; i++) {
          let value = Number(this.state.arrayOrders[2][i].price);
          let qua = Number(this.state.arrayOrders[2][i].quantity);

          while(j >= 0 && value >= data[j].category){
            j--;
          }
          if(j < 0)
            j = 0;
          while(j < n1 && value <= data[j].category){
            j++;
          }
          if(j > 0 && data[j-1].category == value){
              data.push({ value: data[j-1].value - qua, category: value });
          }
          else{
              data.push({ value: -qua, category: value });
          }
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

        // chart2.colors.list = [
        //     am4core.color("#000")
        // ];


        let series2 = chart2.series.push(new am4charts.ColumnSeries());
        series2.dataFields.categoryY = "category";
        series2.dataFields.valueX = "value";
        series2.xAxis = valueAxis2;
        series2.name = "Series";

        series2.heatRules.push({
            "target": series2.columns.template,
            "property": "fill",
            "min": am4core.color("#2ecc71"),
            "max": am4core.color("#e74c3c"),
            "dataField": "valueX"
        });

        let series3 = chart2.series.push(new am4charts.ColumnSeries());
        series3.dataFields.categoryY = "category";
        series3.dataFields.valueX = "value";
        series3.xAxis = valueAxis2;
        series3.name = "Series";

        series2.heatRules.push({
            "target": series2.columns.template,
            "property": "fill",
            "min": am4core.color("#2ecc71"),
            "max": am4core.color("#e74c3c"),
            "dataField": "valueX"
        });

        // series2.stroke = am4core.color("{valueX.value}");
        // series2.columns.template.fill = am4core.color("#00ff00");

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
                            <select className="input" type="text" defaultValue="usd" name="name" placeholder="Наименование" onChange={(e)=>{this.setState({ name: e.target.value })}}>
                                <option value="usd">Доллар</option>
                                <option value="eur">Евро</option>
                                <option value="btc">Биткоин</option>
                            </select>
                            <input className="input" type="number" name="quantity" placeholder="Количество" onChange={(e)=>{this.setState({ quantity: e.target.value })}} required />
                            <input className="input" type="number" name="price" placeholder="Цена" onChange={(e)=>{this.setState({ price: e.target.value })}} required />
                            <select className="input" type="text" defaultValue="buy" name="type" placeholder="Тип" onChange={(e)=>{this.setState({ type: e.target.value })}}>
                                <option value="buy">Купить</option>
                                <option value="sell">Продать</option>
                            </select>
                            <button className="btn" onClick={()=>{this.onSendOrder()}}>Отправить</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
