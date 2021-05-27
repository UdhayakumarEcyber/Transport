import { ResponsivePie } from '@nivo/pie'
import React, { useState } from 'react'
import { registerWidget, IContextProvider  } from './uxp';  
import { DataList, WidgetWrapper, MapComponent, TitleBar, ItemListCard, FilterPanel, DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter } from "uxp/components";

import './styles.scss';  
 
interface IDonutChartProps{
    uxpContext?: IContextProvider;
} 

var dataset = [ 
             {
               "id": "1",
               "travelvehicle": "./images/green-bus.svg",
               "travelTime": 43,
               "travelFrom": "Airport", 
               "travelTo":"Melbourne City",
               "status" : "ontime",
               "statusValue" : "ON TIME"
             },
             {
              "id": "2",
              "travelvehicle": "./images/orange-bus.svg",
               "travelTime": 43,
               "travelFrom": "Airport", 
               "travelTo":"Melbourne City",
               "status" : "delayed",
               "statusValue" : "DELAYED"
             },
             {
              "id": "3",
              "travelvehicle": "./images/green-bus.svg",
              "travelTime": 43,
              "travelFrom": "Airport", 
              "travelTo":"Melbourne City",
              "status" : "ontime",
              "statusValue" : "ON TIME"
             },
             {
              "id": "4",
              "travelvehicle": "./images/green-bus.svg",
              "travelTime": 43,
              "travelFrom": "Airport", 
              "travelTo":"Melbourne City",
              "status" : "ontime",
              "statusValue" : "ON TIME"
             } 
 ] 
 

export const TransportWidget:React.FunctionComponent<IDonutChartProps> = (props) =>  {  
 
  let [toggleFilterValue, setToggleFilterValue] = React.useState<string>("Next_hour");
  

    let [data,setData] = React.useState([])

function getData () {

    props.uxpContext.executeAction("Example1","weather",{},{json:true}).then(res=>{
        setData(res);
    }).catch(e=>{
        // reload();
    });

}
React.useEffect(() =>{
    getData();
}, []) 
 

const TransportList = () => (
    <ul className="daylist">
      {dataset.map(item => (
        <li key={item.id} className={item.status}>  
          <>
              <div className="vehicle"><img src={item.travelvehicle}></img></div>
              <div className="travel-time"><label>Travel time</label><p>{item.travelTime} minutes</p></div>
              <div className="travel-from"><label>From</label><p>{item.travelFrom}</p></div>
              <div className="travel-to"><label>to</label><p>{item.travelTo}</p></div> 
              
              <div className="status">
                    {item.statusValue}
              </div>
          </> 
          
        </li>
      ))}
    </ul>
  );
 
    return  <>

    <WidgetWrapper>  

        <div className="transport_widget">

          <div className="transport_box"> 

              <div className="transport-top">  
                  <h4>Transport</h4>

                  <div className="hour_toggle"> 
                  
                      <ToggleFilter className="toggle-btn"
                          options={[
                              { label: "Next hour", value: "Next_hour" },
                              { label: "Today", value: "Today" }, 
                          ]}
                          value={toggleFilterValue}
                          onChange={(value) => { setToggleFilterValue(value) }}
                      />

                  </div>

              </div>

              <div className="transport-content"> 
                  <TransportList />   
              </div>
            
          </div> 

          <div className="transport_map">

                <div className="transport_map-sec" style={{ width: "100%", height: "100%" }}>
                    <MapComponent zoom={10}
                        mapUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        markers={[
                            {
                                latitude: -37.840935,
                                longitude: 144.946457  
                            },
                            {
                                latitude: 1.290270,
                                longitude: 103.851959,
                                data: {
                                    name: "Melbourne"
                                },
                                
                            } 
                        ]}
                        onMarkerClick={(el, data) => {
                            console.log(el)
                            console.log(data)
                        }}

                    />
                </div> 
            </div>   
        </div> 
    </WidgetWrapper>

    </>

    } 


/**
 * Register as a Widget
 */
 registerWidget({
    id: "TransportWidget",
    name: "Transport Widget",
    widget: TransportWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});