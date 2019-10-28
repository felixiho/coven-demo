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
import ReactPlaceholder from 'react-placeholder';
import QueueAnim from 'rc-queue-anim';

import './index.css';


const airports = [
    {
        id:"1",
        city:"Atlanta",
        icao:"KATL"
    },
    {
        id:"2",
        city:"Toronto",
        icao:"CYYZ" 
    },
    {
        id:"3",
        city:"Dubai",
        icao:"OMDB" 
    },
    {
        id:"4",
        city:"Los Angeles",
        icao:"KLAX" 
    },
    {
        id:"5",
        city:"Tokyo",
        icao:"RJTT" 
    },
    {
        id:"6",
        city:"Chicago",
        icao:"KORD" 
    },
    {
        id:"7",
        city:"London",
        icao:"EGLL" 
    },
    {
        id:"8",
        city:"Hong Kong",
        icao:"VHHH" 
    },
    {
        id:"9",
        city:"New York",
        icao:"KJFK" 
    },
    {
        id:"10",
        city:"Paris",
        icao:"LFPG" 
    }
]
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
        }
        this.handleModal = this.handleModal.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    
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
        const today = new Date(); 
        const days = 86400000; //number of milliseconds in a day
        const fiveDaysAgo = new Date(today - 6*days);
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
                arrival.firstSeen = JSON.stringify(this.formatDate(arrival.firstSeen)); 
                arrival.lastSeen = JSON.stringify(this.formatDate(arrival.lastSeen)); 
                formatedArrivals.push(arrival)
            });
            departures.map((departure) => {
                departure.firstSeen = JSON.stringify(this.formatDate(departure.firstSeen));
                departure.lastSeen = JSON.stringify(this.formatDate(departure.lastSeen)); 
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
                    <DialogTitle id="max-width-dialog-title">{this.state.city}</DialogTitle>
                    <DialogContent>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleTabChange} >
                                <Tab label="Arrivals"   />
                                <Tab label="Departures"   /> 
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.value} index={0}>
                            <h2>Arrivals</h2> 
                            <ReactPlaceholder  type='text' showLoadingAnimation  ready={this.state.airportReady} rows={12}  >
                                <Paper style={{ height: 400, width: '100%' }}>
                                    <Virtualized
                                        rowCount={this.state.arrivals.length}
                                        rowGetter={({ index }) => this.state.arrivals[index]}
                                        columns={[
                                        {
                                            width: 200,
                                            label: 'ICAO',
                                            dataKey: 'icao24',
                                        },
                                        {
                                            width: 200,
                                            label: 'Arriving From',
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
                                        },
                                        {
                                            width: 200,
                                            label: 'Call Sign',
                                            dataKey: 'callsign',
                                        },
                                        ]}
                                    />
                                </Paper>
                            </ReactPlaceholder> 
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                            <h2>Departures</h2> 
                            <ReactPlaceholder  type='text' showLoadingAnimation  ready={this.state.airportReady} rows={12}  >
                                <Paper style={{ height: 400, width: '100%' }}>
                                    <Virtualized
                                        rowCount={this.state.departures.length}
                                        rowGetter={({ index }) => this.state.departures[index]}
                                        columns={[
                                        {
                                            width: 200,
                                            label: 'ICAO',
                                            dataKey: 'icao24',
                                        },
                                        {
                                            width: 200,
                                            label: 'Destination',
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
                                        {
                                            width: 200,
                                            label: 'Call Sign',
                                            dataKey: 'callsign',
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
            </>
        );
    }
}

const City = props => (
    <Card className="a" onClick={() => props.handleModal(props.icao, props.name)}>
        <CardActionArea >
            <CardMedia
                className="a"
                image="https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
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