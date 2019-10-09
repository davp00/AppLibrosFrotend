import React, { Component } from 'react';
import { Typography } from 'antd'
import { Form, Input, Icon, Button, message } from 'antd';
import { Link } from 'react-router-dom'
import Fade from "react-reveal/Fade";
const { Title } = Typography;

class LoginPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }

    handleOnSubmit = ( e ) =>
    {
        e.preventDefault();
        if(this.state.email.length !== 0 && this.state.pass.length !== 0)
        {

        }else
        {
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
                                    name='pass'
                                    onChange={this.handleOnChange}
                                    value={this.state.pass}
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
                    </div>
                </Fade>
            </div>
        )
    }
}

export default LoginPage;