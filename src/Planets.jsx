import * as React from 'react';
import classNames from "classnames";
import {Button,  Segment, Search, Table } from 'semantic-ui-react';
import { searchPlanets, getPlanetInfo } from "./networkService";
import { withRouter } from 'react-router'
import { withCookies } from 'react-cookie';


const resultDiv = ({ name, population }) => [
    <div key={name} className='content'>
        {name && <div className='description'
            style={{ fontSize: (16 + population.toString().length)+'px'}}
         >{name}</div>}
        {/* {population && <div className='description'>{population.toString().length}</div>} */}
    </div>
]




class Planets extends React.Component {
    constructor(props) {
        super(props);
        console.log('formProps', props);
        this.state = {
            isLoading: false,
            value: '',
            results:[],
            planetInfo:{},
            displayTable:false,
        }
    }
    handleSearchChange = async(e, { value }) => {
        this.setState({ isLoading: true, value })

       const planetResults = await searchPlanets(value);
       console.log(planetResults);
        this.setState({ results: planetResults, isLoading: false});
    }
    handleResultSelect = async(e, data) => {
        const { result } = data;
        console.log(result);
        // const planetInfo = await getPlanetInfo(result.url);
        this.setState({ planetInfo: result, displayTable: true});
    }
    componentWillMount() {
        let { cookies } = this.props;
        console.log(cookies.get('name'))
        if (!cookies.get('name')) {
            window.location = '/';
        }
    }
    handleLogout = () =>{
        let { cookies } = this.props;
        cookies.remove('name');
        console.log(cookies.get('name'))
        window.location = '/';
    }
    render() {
        let { isLoading, results, value, planetInfo, displayTable } = this.state;

        return (
            <div className={classNames('flex-col-start', 'full-width', 'full-height', 'align-items-center')}>
                <Segment className={classNames('flex-row-space-between', 'full-width')}> 
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={results}
                        value={value}
                        resultRenderer={resultDiv}
                        // {...this.props}
                    />
                    <Button content={'Logout'} onClick={this.handleLogout}/>
                </Segment>
               {displayTable? <Segment>
                    <Table basic='very' celled collapsing >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>Info</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                   Name
                                </Table.Cell>
                                <Table.Cell>
                                    {planetInfo.name}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                   Climate
                                </Table.Cell>
                                <Table.Cell>
                                    {planetInfo.climate}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                   Population
                                </Table.Cell>
                                <Table.Cell>
                                    {planetInfo.population}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                   Diameter
                                </Table.Cell>
                                <Table.Cell>
                                    {planetInfo.diameter}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                   Terrain
                                </Table.Cell>
                                <Table.Cell>
                                    {planetInfo.terrain}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>: null}
            </div>
        );

    }
}
export default withCookies(withRouter(Planets));
// export default Planets;
