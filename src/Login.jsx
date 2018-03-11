import * as React from 'react';
import classNames from "classnames";
import {
    Segment, Input, Button
} from 'semantic-ui-react';
import { loginUser } from "./networkService";
import { withCookies } from 'react-cookie';

const scrollTextValue = `A long time ago in a galaxy far far away
                        A company XEBIA asked Ankit Mehta to make web app,
                        that logs in a user like Luke Skywalker and lets 
                        him search for planets and display their information.
                        He did that, and now he hopes he will get an interview.
                        May the force be with you!!!`

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log('formProps', props);
        this.state = {
            username: '',
            password: '',
            isLoading:false,
            isError: false
        }
    }
    componentWillMount() {
        let { cookies } = this.props;
        console.log(cookies.get('name'))
        if(cookies.get('name')){
            window.location = '/planets';
        }
    }
    handleLoginClick = async () => {
        let { cookies } = this.props;
        let { username, password } = this.state;
        this.setState({
            isLoading: true
        })
        const result =  await loginUser(username, password);
        if(result){
            cookies.set('name', username);
            window.location = '/planets';
        }else{
            this.setState({
                isLoading: false,
                isError: true,
            })
        }

    };
    handleUsernameChange = (e,data) => {
       this.setState({
           username:data.value,
           isError: false,
       })
    }
    handlePasswordChange = (e,data) => {
       this.setState({
           password:data.value,
           isError: false,
       })
    }
    render(){
        let {username, password, isLoading, isError} = this.state;
        return (
            <div className={classNames('flex-col-start', 'full-width', 'full-height','align-items-center')}>
            <Segment className={classNames('flex-col-center', 'third-width')}>
                <Input icon='user' 
                        defaultValue={username}
                        // value={username}
                        error={isError}
                        iconPosition='left' 
                        placeholder='Enter Username'
                        onChange={this.handleUsernameChange} />
                <Input icon='lock'
                       defaultValue={password} 
                    //    value={password}
                    error={isError} 
                       iconPosition='left' 
                       placeholder='Enter Password' 
                        onChange={this.handlePasswordChange} />
                    <Button content={'Login'}
                     onClick={this.handleLoginClick}
                        loading={isLoading}/>
            </Segment>
                <div id="titles"><div id="titlecontent">

                    <p className={'scrollText'}>{scrollTextValue}</p>

                </div></div>
            </div>
        );
        
    }
}

export default withCookies(Login);
