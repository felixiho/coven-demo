import React, { Component } from 'react';  
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';  
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'; 
import Virtualized from './Virtualized';
import InfoModal from './Modal'; 
import ReactPlaceholder from 'react-placeholder';
import QueueAnim from 'rc-queue-anim';
import Moment from 'react-moment';
import moment from 'moment'

import Slide from '@material-ui/core/Slide';

import './index.css';


const airports = [
    {
        id:"1",
        city:"Atlanta",
        icao:"KATL" ,
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/atlanta.jpg",
        summary: "Hartsfield–Jackson Atlanta International Airport (IATA: ATL, ICAO: KATL, FAA LID: ATL), also known as Atlanta Airport, Hartsfield, or Hartsfield–Jackson, is the primary international airport serving Atlanta, Georgia.",
    },
    {
        id:"2",
        city:"Toronto",
        icao:"CYYZ" ,
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/toronto.jpg",
        summary:"Toronto Pearson International Airport and simply known as Toronto Pearson, Pearson Airport or Pearson, is the primary international airport serving Toronto,"
    },
    {
        id:"3",
        city:"Dubai",
        icao:"OMDB" ,
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/dubai.jpg",
        summary:"Dubai International Airport is the primary international airport serving Dubai, United Arab Emirates and is the world's busiest airport by international passenger traffic."
    },
    {
        id:"4",
        city:"Los Angeles",
        icao:"KLAX" ,
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/losangeles.jpg" ,
        summary:"Los Angeles International Airport, commonly referred to as LAX, is the primary international airport serving Los Angeles, California, United States, and its surrounding metropolitan area."
    },
    {
        id:"5",
        city:"Tokyo",
        icao:"RJTT" ,
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/tokyo.jpg",
        summary:"Tokyo International Airport, commonly known as Haneda Airport, Tokyo Haneda Airport, and Haneda International Airport, is one of the two primary airports that serve the Greater Tokyo Area, and is the ."
    },
    {
        id:"6",
        city:"Chicago",
        icao:"KORD",
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/chicago.jpg",
        summary:"O'Hare Airport, Chicago O'Hare, or simply O'Hare, is an international airport located on the Northwest Side of Chicago, Illinois, 14 miles (23 km) northwest of the Loop business district; operated by the Chicago Department of"
    },
    {
        id:"7",
        city:"London",
        icao:"EGLL",
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/london.jpg",
        summary:"London has six major airports: London City, London Gatwick, London Heathrow, London Luton, London Stansted and London Southend. Find all the information you need about London's airport facilities, locations and connections, including a London airports map."
    },
    {
        id:"8",
        city:"Hong Kong",
        icao:"VHHH",
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/hongkong.jpg",
        summary:"Hong Kong International Airport is Hong Kong's main airport, built on reclaimed land on the island of Chek Lap Kok. The airport is also known as Chek Lap Kok Airport to distinguish it from its predecessor, the former Kai Tak Airport."
    },
    {
        id:"9",
        city:"New York",
        icao:"KJFK",
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/newyork.jpg",
        summary:"John F. Kennedy International Airport is an international airport in Queens, New York. It is the primary international airport serving New York City."
    },
    {
        id:"10",
        city:"Paris",
        icao:"LFPG",
        link:"https://res.cloudinary.com/felixiho/image/upload/c_scale,w_550/demoi/paris.jpg",
        summary:"Orly International Airport also handles some major international flights, including for Air France. ... Paris-Charles de Gaulle International Airport (CDG) ... Many of the world's major airlines fly into CDG, which serves as the main hub for French national carrier Air France."
    }
]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const today = new Date(); 
const days = 86400000; //number of milliseconds in a day
const fiveDaysAgo = new Date(today - 7*days);
class Index extends Component {
    constructor(props) {
        super(props);
        this.baseURL = "https://opensky-network.org/api/";
        this.state = {
            ready:false,
            open: false,
            airportReady: false,
            arrivals: {},
            departures: {},
            city:"",
            value: 0,
            openChild: false,
            childData: {}
        }
        this._table = React.createRef();
        this.handleModal = this.handleModal.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.showTableDetails = this.showTableDetails.bind(this);
        this.handleChildClose = this.handleChildClose.bind(this);
    }

  
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                ready: true 
            })
        }, 2000)
    } 
    handleTabChange(event, value){
        this.setState({
            value: value
        })
    }

    handleModal(icao = false, city = false){  
        this.setState(prevState=> ({
            open : !prevState.open,
            city: city
        }))
         
        return  icao && this.fetchAirportDetails(icao);
    }

     fetchAirportDetails(icao){  
        this.setState({airportReady :false})
        //Current date in UNIX 
        const start = Math.round(fiveDaysAgo.getTime() / 1000);
        const end = Math.round(today.getTime() / 1000);
        const arrival = `${this.baseURL}/flights/arrival?airport=${icao}&begin=${start}&end=${end}`;
        const departure = `${this.baseURL}/flights/departure?airport=${icao}&begin=${start}&end=${end}`;
        
        //Note that promise all is used here because we want a single point of failure if 
        //any of the calls fails. i.e if departure api call fails, we throw a general error.
        return Promise.all([
            fetch(arrival),
            fetch(departure)
        ]).then( async ([arrivalReseponse,departureResponse]) =>  { 
            let arrivals = await arrivalReseponse.json();
            let departures = await departureResponse.json();
            let formatedArrivals = [];
            let formatedDepartures = [];
            arrivals.map((arrival) => {
                arrival.firstSeen = moment.unix(arrival.firstSeen).format('LLLL'); 
                arrival.lastSeen = moment.unix(arrival.lastSeen).format('LLLL'); 
                arrival.icao24 = arrival.icao24.toUpperCase()
                formatedArrivals.push(arrival)
            });
            departures.map((departure) => { 
                departure.firstSeen = moment.unix(departure.firstSeen).format('LLLL') ;
                departure.lastSeen = moment.unix(departure.lastSeen).format('LLLL');
                departure.icao24 = departure.icao24.toUpperCase()
                formatedDepartures.push(departure) 
            })
            this.setState({
                arrivals: formatedArrivals,
                departures: formatedDepartures,
                airportReady: true
            });  
        })
        .catch((err) => {
            console.log(err);
        })

    } 
    formatDate(rawDate) { 
        const date = new Date(rawDate*1000);  
        return date;
    }

    showTableDetails({ event, index, rowData }){
        this.setState({
            openChild: true,
            childData: rowData
        });
        console.log(rowData)
    };

    handleChildClose(){
        this.setState({
            openChild:false,
            childData: {}
        })
    }



    render() {  
        return (  
            <>
                <h1 className="parent-login">Cities</h1>
                <ReactPlaceholder  type='media' showLoadingAnimation  ready={this.state.ready} rows={24}  > 
                    <QueueAnim
                        type={['right', 'left']}
                        ease={['easeOutQuart', 'easeInOutQuart']} 
                        duration={2000}
                        component={Grid}
                        componentProps={{
                            container : true,
                            direction : "row",
                            justify : "center",
                            alignItems : "center",
                            className : "parent-login"
                        }}
                    > {

                        airports.map(airport => (
                            <Grid className="airport" key={airport.id} item lg={4} md={5} xs={11}>
                                <City  
                                    key={airport.id}
                                    handleModal={this.handleModal}
                                    icao={airport.icao}
                                    name={airport.city}
                                    link={airport.link}
                                    summary={airport.summary}
                                />
                            </Grid>
                        )) } 
                    </QueueAnim>
                            
                    <Dialog
                        fullWidth={true}
                        maxWidth="md"
                        open={this.state.open}
                        onClose={this.handleModal}  
                        aria-labelledby="max-width-dialog-title"
                        >
                        <DialogTitle id="max-width-dialog-title">
                            {this.state.city}
                            <span><p className="p-span">Showing flights from   <b className="bolder"><Moment format="LLLL" date={fiveDaysAgo} /></b>  to <b className="bolder"><Moment format="LLLL" date={today} /> </b> 
                            </p></span>
                        </DialogTitle>
                        <DialogContent>
                            <AppBar position="static">
                                <Tabs value={this.state.value} onChange={this.handleTabChange} >
                                    <Tab label="Arrivals"   />
                                    <Tab label="Departures"   /> 
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.value} index={0}>
                                <h2>Flight Arrivals</h2> 
                                <ReactPlaceholder  type='text' showLoadingAnimation  ready={this.state.airportReady} rows={12}  >
                                    <Paper style={{ height: 400, width: '100%' }}>
                                        <Virtualized
                                            rowCount={this.state.arrivals.length}
                                            rowGetter={({ index }) => this.state.arrivals[index]}
                                            ref={this._table}
                                            headerHeight={40}
                                            onRowClick={ ({ event, index, rowData }) => this.showTableDetails({ event, index, rowData }   )}
                                            columns={[
                                            {
                                                width: 200,
                                                label: 'Aircraft ICAO24',
                                                dataKey: 'icao24',
                                            },
                                            {
                                                width: 200,
                                                label: 'Origin Airport',
                                                dataKey: 'estDepartureAirport',
                                            },
                                            {
                                                width: 200,
                                                label: 'First Seen',
                                                dataKey: 'firstSeen',
                                            },
                                            {
                                                width: 200,
                                                label: 'Last Seen',
                                                dataKey: 'lastSeen',
                                            }
                                            ]}
                                        />
                                    </Paper>
                                </ReactPlaceholder> 
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
                                <h2>Flight Departures</h2> 
                                <ReactPlaceholder  type='text' showLoadingAnimation  ready={this.state.airportReady} rows={12}  >
                                    <Paper style={{ height: 400, width: '100%' }}>
                                        <Virtualized
                                            rowCount={this.state.departures.length}
                                            rowGetter={({ index }) => this.state.departures[index]}
                                            ref={this._table}
                                            headerHeight={40}
                                            onRowClick={ ({ event, index, rowData }) => this.showTableDetails({ event, index, rowData }   )}
                                            columns={[
                                            {
                                                width: 200,
                                                label: 'Aircraft ICAO24',
                                                dataKey: 'icao24',
                                            },
                                            {
                                                width: 200,
                                                label: 'Destination Airport',
                                                dataKey: 'estArrivalAirport',
                                            },
                                            {
                                                width: 200,
                                                label: 'First Seen',
                                                dataKey: 'firstSeen',
                                            },
                                            {
                                                width: 200,
                                                label: 'Last Seen',
                                                dataKey: 'lastSeen',
                                            }, 
                                            ]}
                                        />
                                    </Paper> 
                                </ReactPlaceholder>
                            </TabPanel> 
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleModal} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ReactPlaceholder> 
                <InfoModal
                    openChild={this.state.openChild}
                    handleChildClose={this.handleChildClose}
                    value={this.state.value}
                    {...this.state.childData}
                 />
            </>
        );
    }
}

const City = props => (
    <Card className="a" onClick={() => props.handleModal(props.icao, props.name)}>
        <CardActionArea >
            <CardMedia
                className="a"
                image={props.link}
                title={props.name}
                style = {{ height: 200}}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.summary}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions> 
        </CardActions>
    </Card>
)



const  TabPanel = (props)=> {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  } 
export default Index;