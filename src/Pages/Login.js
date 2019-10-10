import React, { Component } from 'react';
import {Spin, Typography} from 'antd'
import { Form, Input, Icon, Button, message } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import Fade from "react-reveal/Fade";
import LoadingSpin from "../Component/LoadingSpin";
import axios from 'axios';
import {API_URL} from "../config";
const { Title } = Typography;

class LoginPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    componentWillMount() {
        document.title = 'Inicia Sesión - AppBook'
    }

    handleOnSubmit = ( e ) =>
    {
        e.preventDefault();
        this.setState({loading:true});
        if(this.state.email.length !== 0 && this.state.password.length !== 0)
        {
            axios.post(`${API_URL}/api/login`, {email: this.state.email, password: this.state.password}).then(
                ({ data } ) =>
                {

                    if(data.error)
                    {
                        message.error(data.message);
                    }
                    localStorage.setItem('user_id', data.id);
                    this.props.history.push('/');
                    this.setState({loading:false});
                }
            ).catch(
                ( ) =>
                {
                    message.error('Ha ocurrido un error');
                    this.setState({loading:false});
                }
            );
        }else
        {
            this.setState({loading:false});
            message.error('Todos los campos son requeridos');
        }
    };

    handleOnChange = ( { target: { value, name}} ) =>
    {
        this.setState((state) =>
        {
            state[name] = value;
            return state;

        });


    };

    render() {
        return(
            <div className='section-form'>
                <div className='left-image'>
                </div>
                <Fade>
                    <div className='right-form pt-form pr-5'>
                        <Spin spinning={this.state.loading} tip='Registrando...' indicator={LoadingSpin}>
                            <Title>Iniciar Sesión</Title>
                            <Form className='mt-5' onSubmit={this.handleOnSubmit}>
                                <Form.Item>
                                    <Title level={4}>Correo</Title>
                                    <Input
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Ingrese su correo"
                                        name='email'
                                        onChange={ this.handleOnChange }
                                        value={this.state.email}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Title level={4}>Contraseña</Title>
                                    <Input.Password
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Ingrese su Contraseña"
                                        name='password'
                                        onChange={this.handleOnChange}
                                        value={this.state.password}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Iniciar
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    ¿No tienes una cuenta? <Link to='/register'>Registrate ahora!</Link>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withRouter(LoginPage);