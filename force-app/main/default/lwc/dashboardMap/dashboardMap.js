import { LightningElement, api } from 'lwc';
import highchartsResource from '@salesforce/resourceUrl/HighChart';
import mBurseCss from '@salesforce/resourceUrl/mBurseCss';
import { loadScript } from 'lightning/platformResourceLoader';
export default class DashboardMap extends LightningElement {
    @api mapData;
    @api mapLocation;
    mapPoint = mBurseCss + '/mburse/assets/map_point.png';
    runMaps(){
        var postData, chartData, states, chartstates = [], chloChart, typeBasedUrl, containerChart;
        postData = JSON.parse(this.mapData)
        chartData = JSON.parse(postData.modal);
        typeBasedUrl = (postData.mapType === 'CANADA') ? 'https://code.highcharts.com/mapdata/countries/ca/ca-all.topo.json' : 'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json' ;
        if(chartData.length > 0){
            if(chartData[0].Driving_States__c !== undefined){
                chartstates = []
                let drivingList = chartData[0].Driving_States__c.split(';')
                const canadaDrivingState = drivingList.filter(value => postData.arrayList.includes(value));
                states = (postData.mapType === 'CANADA') ? canadaDrivingState : drivingList;
               // subtitle = states.join(', ')
                states.forEach((item, index) =>{
                    let object = {}
                    let val = index + 1
                    object.value = val
                    object.code = item
                    chartstates.push(object)
                })
            }
        }
      
       
        console.log(chartData, chartstates)
        containerChart = this.refs.map;
        Highcharts.getJSON(typeBasedUrl, function (topology) {
            chloChart =  Highcharts.mapChart(containerChart, {
                chart: {
                    renderTo: 'container',
                    map: topology,
                    borderColor:postData.border,
                    backgroundColor: postData.background,
                  //  height: postData.height, //250
                    height: (3 / 4 * 100) + '%',
                   // width: 300, // 360
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    spacingTop: 0,
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    // events: {
                    //     render: function() {
                    //         const chart = this,
                    //             group = chart.series[0].group,
                    //             bBox = group.getBBox(),
                    //             ratio = bBox.width / bBox.height;
                            
                    //         if(!chart.allowUpdate) {
                    //             chart.allowUpdate = true;
                    //             console.log("chart##", chart.plotSizeX, ratio)
                    //             chart.setSize(null, (chart.plotSizeX) / ratio, false);
                    //             chart.allowUpdate = false;
                    //         }
                    //     }
                    // }
                    //styledMode: true
                },
                
                responsive:{
                    rules:[{
                      condition:{
                       maxWidth: 1000
                      }
                     }]
                },

                title: {
                    text: ''
                    // align: 'left',
                    // fontSize: '16px',
                    // color: '#1D1D1D'
                },

                //  subtitle: {
                //     text: subtitle,
                //     align: 'left',
                //     fontSize: '14px',
                //     color: '#6C6C6C'
                // },

                exporting: {
                    enabled: false,
                    sourceWidth: 600,
                    sourceHeight: 500
                },

                legend: {
                    enabled: false,
                    layout: 'horizontal',
                    borderWidth: 0,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    floating: true,
                    verticalAlign: 'top',
                    y: 25
                },

                mapNavigation: {
                    enabled: false
                },

                colorAxis: {
                    min: 1,
                    type: 'logarithmic',
                    minColor: '#7abb4a',
                    maxColor: '#7abb4a',
                    stops: [
                        [0, '#7abb4a'],
                        [0.67, '#7abb4a'],
                        [1, '#7abb4a']
                    ]
                },

                credits: {
                    enabled: false
                },

                series: [{
                    borderColor: '#FFFFFF',
                    nullColor: '#d9d9d9',
                    nullInteraction: true,
                    borderWidth: 0.2,
                    animation: {
                        duration: 1000
                    },
                    data: chartstates,
                    joinBy: ['hc-a2', 'code'],
                    dataLabels: {
                        allowOverlap: false,
                        enabled: true,
                        formatter: function(){
                            if(this.point.options.code === "DC")
                                return this.point.options.code;
                        },
                        color: '#FFFFFF'
                    },
                    name: '', //  'Population density'
                    states: {
                        hover: {
                            borderWidth: 1
                        }
                    },
                    tooltip: {
                        style:{
                            color: "#1d1d1d",
                            fontFamily: 'Proxima Nova'
                        },
                        nullFormatter: function(){
                            return '<span style="font-weight: bold; font-size:12px">NOT A DRIVING TERRITORY</span><br/>Trips traveled here will<br/>display as an Uncategorized<br/>or Personal trip in mLog.<br/>'
                        },
                        headerFormat: null,
                        pointFormatter: function() {
                            return '<span style="font-weight: bold; font-size:14px">'+ this.name + '</span><br/>Business mileage &<br/>gas prices are based<br/>on this state.<br/>' 
                        }
                    }
                }],

                navigation: {
                    menuItemStyle:{
                        fontFamily: 'Proxima Nova',
                        fontSize: 15,
                        padding: '10px',
                    },
                    menuItemHoverStyle: {
                        background: '#7abb4a',
                        color: '#FFFFFF'
                    }
                }
            });
        })
    }

    locateMaps(){
                var postData, chartData, states, chartstates = [], chloChart, typeBasedUrl, containerChart, _self = this;
                postData = JSON.parse(this.mapLocation)
                chartData = JSON.parse(postData.modal);
                typeBasedUrl = (postData.mapType === 'CANADA') ? 'countries/ca/ca-all' : 'countries/us/us-all' ;
                containerChart = this.refs.location
               //countries/us/custom/us-all-territories
                Highcharts.mapChart(containerChart, {
                        chart: {
                            map: typeBasedUrl,
                            borderColor:postData.border,
                            backgroundColor: postData.background,
                          //  height: postData.height, //250
                            height: postData.vertical,
                            //width: postData.width, // 360
                            margin: postData.margin,
                            // marginTop: 20,
                            // marginBottom: 0,
                            // marginLeft: 0,
                            // marginRight: 0,
                            spacingTop: postData.top,
                            spacingBottom: postData.bottom,
                            // spacingLeft: 0,
                            // spacingRight: 0
                            //styledMode: true
                        },

                        accessibility:{enabled: false},
                        
                        responsive:{
                            rules:[{
                              condition:{
                               maxWidth: 1000
                              }
                             }]
                        },

                        title: {
                            text: postData.title
                        },

                        tooltip: {
                                pointFormatter :  function () {
                                          // display only if larger than 1
                                          return '<b>'+this.Name+'</b>' + '<br>' + this.address + '<br/>' + 'Fixed Amount: ' + this.amount;
                                },
                                headerFormat: '',
                                style: {
                                    color: '#1d1d1d',
                                    fontFamily: 'Proxima Nova'
                                },
                                borderColor: '#7abb4a'
                        },

                        legend: {
                            enabled: false,
                        },

                        mapNavigation: {
                            enabled: postData.navigation,
                            // enableDoubleClickZoomTo: true,
                            buttonOptions: {
                                align: 'bottom',
                                alignTo: 'plotBox',
                                verticalAlign: 'bottom',
                            }
                        },

                        credits: {
                            enabled: false
                        },

                        // exporting: {
                        //         menuItemDefinitions: {
                        //         // Custom definition
                        //         label: {
                        //             onclick: function () {
                        //                 this.renderer.label(
                        //                     'You just clicked a custom menu item',
                        //                     100,
                        //                     100
                        //                 )
                        //                     // .attr({
                        //                     //     fill: '#a4edba',
                        //                     //     r: 5,
                        //                     //     padding: 10,
                        //                     //     zIndex: 10
                        //                     // })
                        //                     .css({
                        //                         fontFamily: 'Proxima Nova'
                        //                     })
                        //                     .add();
                        //             },
                        //             text: 'Show label'
                        //         }
                        //     },
                        //     buttons: {
                        //         contextButton: {
                        //             menuItems: ['viewFullscreen']
                        //         }
                        //     }
                        // },

                        series: [{
                            name: 'My Team location',
                            borderColor: '#FFFFFF',
                            nullColor: '#d9d9d9',
                            borderWidth: 0.3,
                            joinBy: ['hc-a2', 'MailingState'],
                            animation: {
                                duration: 1000
                            },
                            showInLegend: false
                        },{
                                type: 'mappoint',
                                color: Highcharts.getOptions().colors[1],
                                data: chartData,
                                marker: {
                                    symbol: _self.mapPoint
                                },
                                dataLabels: {
                                    enabled: false
                                }
                        }],

                        navigation: {
                            menuItemStyle:{
                                fontFamily: 'Proxima Nova',
                                padding: '10px'
                            },
                            menuItemHoverStyle: {
                                background: 'transparent',
                                color: '#1D1D1D'
                            }
                            // },
                            // buttonOptions: {
                            //    width: 48
                            // }
                        }
                });
    }

    renderedCallback() {
        loadScript(this, highchartsResource + "/proj4.js")
        .then(() => {
             loadScript(this, highchartsResource + "/highmaps.js")

            .then(() => {

                console.log("SUCCESS: highmaps.js");

                loadScript(this, highchartsResource + "/data.js")

                    .then(() => {

                        console.log("SUCCESS: data.js");

                        loadScript(this, highchartsResource + "/exporting.js")

                            .then(() => {

                                console.log("SUCCESS: exporting.js");


                                loadScript(this, highchartsResource + "/offline-exporting.js")

                                    .then(() => {

                                        console.log("SUCCESS: offline-exporting.js");
                                        try{
                                            this.runMaps();
                                            this.locateMaps()
                                        }catch(e){
                                            console.log("T--", e.message)
                                        }
                                       

                                    })

                                    .catch(error => console.log("ERROR: accessibility.js"));

                            })

                            .catch(error => console.log("ERROR: export-data.js"));

                    })

                    .catch(error => console.log("ERROR: exporting.js"));

            })

            .catch(error => console.log("ERROR: highmaps.js"));
        }).catch(error => console.log("ERROR: proj4.js"))
    }
}