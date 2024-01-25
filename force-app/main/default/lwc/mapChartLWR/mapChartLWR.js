import { LightningElement, api, track } from "lwc";
import highchartsResource from "@salesforce/resourceUrl/HighChart";
import mBurseCss from "@salesforce/resourceUrl/mBurseCss";
import { loadScript } from "lightning/platformResourceLoader";
export default class MapChartLWR extends LightningElement {
  mapPoint = mBurseCss + '/mburse/assets/map_point.png';
  @api locate;
  @api type;
  @api background;
  @api borderColor;
  @api height;
  @api width;
  @api vH;
  @api margin;
  @api mapNavigation;
  @api spacingTop;
  @api spacingBottom;
  @api title;


  get styleCss(){
    return `height:${this.height}px`
  }

  locateMaps() {
    var postData, chartData, typeBasedUrl, containerChart, _self = this, mapData;
    this.locate = this.locate !== undefined ? this.locate : [];
    console.log("map--", _self);
    mapData = {
      modal: this.locate,
      title: this.title,
      background: this.background,
      border: this.borderColor,
      height: this.height,
      width: this.width,
      navigation: this.mapNavigation,
      vertical: this.vH,
      margin: this.margin,
      top: this.spacingTop,
      bottom: this.spacingBottom,
      mapType: this.type,
      mapSymbol : this.mapPoint
    }
    postData = mapData;
    chartData = postData.modal;
    typeBasedUrl = postData.mapType === "CANADA" ? "countries/ca/ca-all" : "countries/us/us-all";
    containerChart = this.refs.location;
    //countries/us/custom/us-all-territories
    Highcharts.mapChart(containerChart, {
      chart: {
        map: typeBasedUrl,
        borderColor: postData.border,
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

      accessibility: { enabled: false },

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1000,
            },
          },
        ],
      },

      title: {
        text: postData.title,
      },

      tooltip: {
        pointFormatter: function () {
          // display only if larger than 1
          return (
            "<b>" +
            this.Name +
            "</b>" +
            "<br>" +
            this.address +
            "<br/>" +
            "Fixed Amount: " +
            this.amount
          );
        },
        headerFormat: "",
        style: {
          color: "#1d1d1d",
          fontFamily: "Proxima Nova",
        },
        borderColor: "#7abb4a",
      },

      legend: {
        enabled: false,
      },

      mapNavigation: {
        enabled: postData.navigation,
        // enableDoubleClickZoomTo: true,
        buttonOptions: {
          align: "bottom",
          alignTo: "plotBox",
          verticalAlign: "bottom",
        },
      },

      credits: {
        enabled: false,
      },

      series: [
        {
          name: "My Team location",
          borderColor: "#FFFFFF",
          nullColor: "#d9d9d9",
          borderWidth: 0.3,
          joinBy: ["hc-a2", "MailingState"],
          animation: {
            duration: 10,
          },
          showInLegend: false,
        },
        {
          type: "mappoint",
          data: chartData,
          marker: {
            symbol: `url(${this.mapPoint})`
          },
          dataLabels: {
            enabled: false,
          },
        },
      ],

      navigation: {
        menuItemStyle: {
          fontFamily: "Proxima Nova",
          padding: "10px",
        },
        menuItemHoverStyle: {
          background: "transparent",
          color: "#1D1D1D",
        },
        // },
        // buttonOptions: {
        //    width: 48
        // }
      },
    });
  }

  connectedCallback() {
    loadScript(this, highchartsResource + "/proj4.js")
      .then(() => {
        console.log("SUCCESS: proj4.js");

        loadScript(this, highchartsResource + "/highmaps.js")
          .then(() => {
            console.log("SUCCESS: highmaps.js");

            loadScript(this, highchartsResource + "/us-all.js")
              .then(() => {
                console.log("SUCCESS: us-all.js");

                loadScript(this, highchartsResource + "/ca-all.js")
                  .then(() => {
                    console.log("SUCCESS: ca-all.js");

                    try {
                      this.locateMaps();
                    } catch (e) {
                      console.log("T--", e.message);
                    }
                  })

                  .catch((error) => console.log("ERROR: ca-all.js"));
              })

              .catch((error) => console.log("ERROR: us-all.js"));
          })

          .catch((error) => console.log("ERROR: highmaps.js"));
      })

      .catch((error) => console.log("ERROR: proj4.js"));
  }
}