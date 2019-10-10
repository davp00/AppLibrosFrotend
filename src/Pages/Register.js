import React, { Component } from 'react';
import {Button, Icon, Input, message, Typography, Spin} from "antd";
import { Form } from 'antd';
import {Link} from "react-router-dom";
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import { API_URL } from "../config";
import { withRouter } from 'react-router-dom';
import LoadingSpin from './../Component/LoadingSpin'

const { Title } = Typography;


class RegisterPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            pass: '',
            loading: false
        }
    }

    componentWillMount() {
        document.title = 'Registrate - AppBook'
    }

    handleOnSubmit = ( e ) =>
    {
        e.preventDefault();
        this.setState({loading:true});
        if(this.state.email.length !== 0 &&
            this.state.password.length !== 0 &&
            this.state.first_name.length !== 0 &&
            this.state.last_name !== 0)
        {
            axios.post(`${API_URL}/api/register`, this.state).then(
                ( {data} ) =>
                {

                    this.setState({loading:false});
                    if(!data.error)
                    {
                        message.success('Usuario Registrado con exito');
                        this.setState({
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                        });

                        setTimeout(( ) =>
                        {
                            this.props.history.push('/login');
                        }, 2000);
                    }else
                        message.error(data.message);

                }
            ).catch( ( err ) =>
            {
                message.error('Ha ocurrido un error');
                this.setState({loading:false})
            });
        }else
        {
            message.error('Todos los campos son requeridos');
            this.setState({loading:false})
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
                            <Title>Registro</Title>
                            <Form className='mt-5' onSubmit={this.handleOnSubmit}>
                                <Form.Item>
                                    <Title level={4}>Nombre</Title>
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Ingrese su Nombre"
                                        name='first_name'
                                        onChange={ this.handleOnChange }
                                        value={this.state.first_name}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Title level={4}>Apellido</Title>
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Ingrese su Apellido"
                                        name='last_name'
                                        onChange={ this.handleOnChange }
                                        value={this.state.last_name}
                                    />
                                </Form.Item>
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
                                    ¿Ya tienes una cuenta? <Link to='/login'>Inicia Sesión!</Link>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withRouter(RegisterPage);