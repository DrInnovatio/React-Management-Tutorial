import React, {Component} from 'react';
import Customer from './Components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
	root:{
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table:{
		minWidth: 1600
	},
	progress: {
		margin: theme.spacing.unit * 2
	}
})

class App extends Component {

	state = {
		customers: "",
		completed: 0 
	}

	componantDidMount(){
		this.timer = setInterval(this.progree, 20); 
		this.callApi()
		.then(res => this.setState({customers: res}))
		.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/customers');
		const body = await response.json();
		return body;
	}

	progress = () => {
		const {completed} = this.state;
		this.setState({completed: completed >= 100 ? 0 : completed + 1});
	}

  render(){
		const {classes} = this.props;
    return (
      <Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Number</TableCell>
								<TableCell>Image</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Birthday</TableCell>
								<TableCell>Gender</TableCell>
								<TableCell>Occupation</TableCell>
							</TableRow>
						</TableHead>
              <TableBody>
              	{this.state.customers ? this.state.customers.map(c => { return (
								<Customer 
								key={c.id}
								id={c.id}
								image={c.image}
								name={c.name}
								birthday={c.birthday}
								gender={c.gender}
								job={c.job}                       
								/>
							)
							}) : 
							<TableRow>
								<TableCell colSpan="6" align="center">
									<CircularProgress className={classes.progress} variant="determinate" 
															value={this.state.completed}/>
								</TableCell>
							</TableRow>
						};            
            </TableBody>          
          </Table>
      </Paper>        
    );
  }
}

export default withStyles(styles)(App);
