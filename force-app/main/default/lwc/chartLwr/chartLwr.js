import { LightningElement, api, wire } from 'lwc';
import highchartsResource from '@salesforce/resourceUrl/HighChart';
import { loadScript } from 'lightning/platformResourceLoader';
import { subscribe, MessageContext } from 'lightning/messageService';
import MESSAGE_CHANNEL from '@salesforce/messageChannel/redirectChannel__c';
export default class ChartLwr extends LightningElement {
    @api chartList
    @api viewName;
    wide = false;
    chartV;
    subscription = null;
    jsInitialized = false;

    @wire(MessageContext) messageContext;

    proxyToObj(obj) {
        return JSON.parse(obj);
    }

    constructor() {
        super();
        this.resizeWindow = this.resizeWindow.bind(this);
    }

    runHighcharts(){
        var chartData, chartView, options, doughnutOpt, barOpt, containerChart;
        containerChart = this.template.querySelector('.chart')
        chartData = this.proxyToObj(this.chartList);
        chartData.view = this.viewName;
        if(containerChart){
            options = {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height: 220,
                        reflow: true,
                       // height: (3 / 5 * 100) + '%',
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 140,
                        spacingTop: 0,
                        spacingBottom: 0,
                        type: 'pie',
                        // events: {
                        //     load: function() {
                        //         var chart = this,
                        //         legend = chart.legend
                        //         for (var i = 0, len = legend.allItems.length; i < len; i++) {
                        //         (function(i) {
                        //             var item = legend.allItems[i].legendItem
                        //             item
                        //             .on('mouseover', function(e) {
                        //                 //show custom tooltip here
                        //                 console.log('mouseover' + i)
                        //                 chart.tooltip.refresh(chart.series[len-1-i].points[0])
                        //             })
                        //             .on('mouseout', function(e) {
                        //                 //hide tooltip
                        //                 console.log('mouseout' + i)
                        //             })
                        //         })(i)
                        //         }
                        //     },
                        // }
                    },
                    title: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    responsive:{
                        rules:[{
                            condition:{
                                maxWidth: 1000
                            }
                        }]
                    },
                    legend:{
                        reversed: true,
                        align: 'right',
                        layout: 'vertical',
                       // itemMarginLeft: 30,
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        symbolHeight: 15,
                        symbolWidth: 15,
                        symbolPadding: 9,
                        symbolRadius: 8,
                        verticalAlign: 'middle',
                        labelFormatter: function() {
                            var words = this.name.split(/[\s]+/);
                            var numWordsPerLine = 3;
                            var str = [];

                            for (var word in words) {
                                if (word > 0 && word % numWordsPerLine == 0)
                                    str.push('<br>');

                                str.push(words[word]);
                            }

                            return str.join(' ');
                        },
                        itemStyle: {
                            color: '#000000',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: 'Proxima Nova',
                        },
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            borderWidth: 0,
                            cursor: 'pointer',
                           // center: ['50%', '50%'],
                          //  size: 180,
                            colors: [ '#7abb4a' ,'#37C1EE', '#404b5a', "#d9d9d9"],
                            dataLabels: {
                                enabled: true,
                                padding: 0,
                                connectorPadding: 0,
                                connectorWidth: 0,
                                // x: 5,
                                //y: -8,
                                verticalAlign: 'middle',
                                color: '#000',
                                style: {
                                    fontSize: '12px',
                                    fontFamily: 'Proxima Nova',
                                    textOverflow: 'ellipsis'
                                },
                                formatter: function () {
                                    // display only if larger than 1
                                    return (this.y != 0) ? '<b>' + Highcharts.numberFormat(this.percentage, 1) + '%'  + '</b>' : ''
                                },
                                //format: '{point.percentage:.1f} %',
                                distance: 10
                                //distance: -42
                            },
                            showInLegend: true
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '',
                        states: {
                            inactive: {
                                enabled: false
                            },
                            hover: {
                                enabled: false,
                                brightness: -0.3
                            }
                        },
                        colorByPoint: true,
                        data: [{
                            name: 'Complete',
                            y: chartData.Complete
                        },{
                            name: 'Missing Packet & Insurance',
                            y: chartData.missingPacketandmissingInsurance
                        }, {
                            name: 'Missing Insurance',
                            y: chartData.missingInsurance
                        },  {
                            name: 'Missing Packet',
                            y: chartData.missingpacket
                        }]
                    }],
                    tooltip: {
                        borderRadius: 0,
                        padding: 10,
                        useHTML: true,
                        headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
                        pointFormat: '<tr style="border-top: 1px solid"><td style="text-align: center"><b>{point.percentage:.1f} %</b></td></tr>',
                        footerFormat: '</table>',
                        style: {
                            fontSize : '12px'
                        }
                    }
            }

            doughnutOpt = {
                    chart: {
                       // height: (3 / 5 * 100) + '%',
                        height: 220,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 110,
                        spacingTop: 0,
                        spacingBottom: 0,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            borderWidth: 0,
                            cursor: 'pointer',
                            colors: [ '#d9d9d9' ,'#78bc42'],
                            showInLegend: true,
                            dataLabels: {
                                alignTo: 'plotEdges',
                                overflow: 'allow',
                                style: {
                                    fontSize: '14px'
                                }
                            }
                        }
                    },
                    legend:{
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical',
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        symbolHeight: 14,
                        symbolWidth: 14,
                        symbolRadius: 8,
                        itemStyle: {
                            color: '#000000',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: 'Proxima Nova'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '',
                        states: {
                            inactive: {
                                enabled: false
                            },
                            hover: {
                                enabled: false,
                                brightness: -0.3
                            }
                        },
               
                        size: '90%',
                        innerSize: '70%',
                        colorByPoint: true,
                        data: [{
                            name: 'Non Compliant',
                            //y:100
                            y: chartData.NonCompliant
                        }, {
                            name: 'Compliant',
                            //y: 0
                            y: chartData.Compliant
                        }],
                        dataLabels: {
                            connectorShape: 'crookedLine',
                            connectorWidth: 0,
                            //distance: 10,
                            padding: 0,
                            connectorPadding: 0,
                            distance: -30,
                           // x: 2,
                           // y: 15,
                            style: {
                                    fontSize: '14px',
                                    fontFamily: 'Proxima Nova',
                                    textOverflow: 'ellipsis'
                            },
                            formatter: function () {
                              // display only if larger than 1
                              return (this.y != 0) ? '<b>' + this.y + '%'  + '</b>' : ''
                            }
                          }
                    }],
                    tooltip: {
                        valueSuffix: '%',
                        borderRadius: 0,
                        padding: 10,
                        useHTML: true,
                        headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
                        pointFormat: '<tr style="border-top: 1px solid"><td style="text-align: center"><b>{point.percentage:.1f} %</b></td></tr>',
                        footerFormat: '</table>',
                        style: {
                            fontSize : '12px'
                        }
                    }
            }

            barOpt = {
                    colors: ['#7abb4a', '#7abb4a','#7abb4a', '#7abb4a', '#7abb4a', '#7abb4a'],
                    chart: {
                      //  height: (3 / 5 * 100) + '%',
                        height: 220,
                        marginTop: 0,
                        spacingTop: 0,
                        spacingBottom: 0,
                        type: 'bar'
                    },
                    title: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: ["Yes", "Not Submitted", "Insurance Card", "Not Meeting Minimum", "Expired Insurance", "No Expiration Date"],
                        labels:{
                            style:{
                                color: "#000000",
                                fontSize: '13px',
                                fontFamily: 'Proxima Nova'
                            },
                            
                        }
                    },
                    yAxis:{
                        min: 0,
                        title: {
                            text: null
                        },
                        labels:{
                            style:{
                                color: "#000000",
                                fontSize: '13px',
                                fontWeight: 'bold',
                                fontFamily: 'Proxima Nova'
                            }
                        }
                    },
                    plotOptions: {
                        series: {
                            states: {
                                inactive: {
                                    enabled: false
                                },
                                hover: {
                                    enabled: false,
                                    brightness: -0.3
                                }
                            },
                            colorByPoint: true
                        }
                    },
                    series: [{
                        name: '',
                        data: [chartData.Yes, chartData.NotSubmitted, chartData.InsuranceCard, chartData.NotMeetingMinimum, chartData.ExpiredInsurance, chartData.noExpirationDate],
                        pointWidth: 20,
                        groupPadding: 0,
                        pointPadding: 0
                   }],
                   legend: {
                     enabled: false
                   },
                    tooltip: {
                        // pointFormatter :  function () {
                        //       // display only if larger than 1
                        //       console.log(this)
                        // },
                        borderRadius: 0,
                        padding: 10,
                        useHTML: true,
                        headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
                        pointFormat: '<tr style="border-top: 1px solid"><td style="text-align: center"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        style: {
                            fontSize : '12px'
                        }
                    }
            }

            chartView = (chartData.view === 'Onboarding') ? Highcharts.chart(containerChart, options) : (chartData.view === 'Compliance') ? Highcharts.chart(containerChart, doughnutOpt) : Highcharts.chart(containerChart, barOpt);      
            this.chartV = chartView;
            console.log('chartView', chartView)                  
        }
    }

    resizeWindow(){
        console.log("Resize", window.innerWidth)
        var _self = this
        /*this.template.querySelector('.chart').style.width = this.wide ? window.innerWidth - 310 + 'px' : window.innerWidth - 90 + 'px';
        this.wide = !this.wide;*/
        setTimeout(function() {
            try{
                //_self.runHighcharts();
                _self.chartV.reflow();
            }catch(e){
                console.log("Resize--", e.message, Highcharts)
            }
		}, 400);
    }


    renderedCallback(){
        loadScript(this, highchartsResource + "/highmaps.js")
        .then(() => {
               console.log("SUCCESS: highmaps.js");

                    loadScript(this, highchartsResource + "/export-data.js")

                        .then(() => {

                            console.log("SUCCESS: export-data.js");

                            this.runHighcharts();

                        })

                        .catch(error => console.log("ERROR: export-data.js"));

                })

        .catch(error => console.log("ERROR: highmaps.js"))
    }
    connectedCallback(){
       window.addEventListener('resize', this.resizeWindow);
       if (this.jsInitialized) {
        return;
    }
       this.handleSubscribe();
    }

    handleSubscribe(){
        console.log("inside")
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, MESSAGE_CHANNEL, () => {
            this.resizeWindow();
        });
    }

}