import React from 'react'
import axios from 'axios'
import './Information.css'
// import { useHistory } from "react-router-dom";
class Information extends React.Component {

    state = {
        Info :[],
        searchkey : ''
        
    }   

    setsearch(value){
        this.setState({
            searchkey : value
        })
    }
    componentDidMount(){ //ทำงานหลังrender กรณีไม่มีการupdate state
        this.getdata();
    }
    componentDidUpdate(){
        this.getdata();
    }
    //getdata axios get all data
    getdata(){
        let URL="http://localhost:9000/trips?q="+this.state.searchkey;
        axios.get(URL).then(res => { 
            this.setState({Info:res.data});
          });
    }

    render() {
        return (
            <div className="clearfix">
                <input className="Input" type='text' value={this.state.searchkey}  placeholder="หาที่เที่ยวแล้วไปกับ..."  onChange={e => this.setsearch(e.target.value)}/>
                {
                    this.state.Info.map((data)=>(
                        <div className="container"> 
                                <div className="leftcontainer">
                                    <img className='leftimg'src={data.photos[0]} />
                                </div>
                                
                                <div className="rightcontainer">
                                    <h1 >
                                        <a href={data.url}>{data.title}</a>
                                    </h1>
                                    <p >{data.description.substring(0,150)}...<a href={data.url}>อ่านต่อ</a></p>
                                    <div className="container-tag">
                                        <span>หมวด :</span> {data.tags.map((tag =>
                                            <div className="designtag">
                                                <a href="#" onClick={() => this.setsearch(tag)}>{tag}</a><span>  </span>
                                            </div>
                                            ))}
                                    </div>
                                    <div className="containerimage">
                                        <img className='img'src={data.photos[1]} />
                                        <img className='img'src={data.photos[2]} />
                                        <img className='img'src={data.photos[3]} />
                                    </div>
                                    
                                </div>
                        </div>
                    ))
                }
                

            </div>
        )
    
        
    }
}

export default Information;