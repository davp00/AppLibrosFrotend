import React, { Component } from 'react';
import {Form, Icon, Input, Spin, Typography, Row, Col, Upload, Button, message} from 'antd';
import LoadingSpin from "./LoadingSpin";
import {API_URL} from "../config";
import axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;


class CreateBook extends Component{

    componentWillMount() {
        document.title = 'Crear Libro';
        const { book } = this.props;
        if(book)
        {
            this.setState({
                name: book.name,
                autor: book.autor,
                price: book.price,
                sinopsis: book.sinopsis
            })
        }
    }

    state = {
        file: undefined,
        name: '',
        autor: '',
        price: '',
        sinopsis: ''
    };

    fileProps = {
        onRemove: file => {
            this.setState(state => {
                return {
                    file: undefined,
                };
            });
        },
        listType: 'picture',
        beforeUpload: file => {
            this.setState(state => ({
                file
            }));
            return false;
        },
        file: this.state.file
    };

    handleOnChange = ({ target: { value, name}}) =>
    {
        this.setState((state)=>
        {
            state[name] = value;
            return state;
        });
    };


    handleOnSubmit = (e) =>
    {
        e.preventDefault();
        if(this.state.name.length !== 0 &&
            this.state.autor.length !== 0 &&
            this.state.price.length !== 0 &&
            this.state.sinopsis.length !== 0 && this.state.file !== undefined) {
            const formData = new FormData();
            for (let name in this.state) {
                formData.append(name, this.state[name]);
            }
            const config = {
                headers: {'content-type': 'multipart/form-data'}
            };
            const p_book = this.props.book;

            if (!p_book)
            {
                axios.post(`${API_URL}/api/book`,formData,config).then(
                    ({data})=>
                    {
                        message.success(data.message)
                        this.setState({
                            name : '',
                            autor: '',
                            price: '',
                            sinopsis: '',
                            file: undefined
                        })
                    }
                );
            }else
            {
                formData.append('book_id', p_book.book_id);
                axios.post(`${API_URL}/api/book/edit`,formData, config).then(
                    ( data ) =>
                    {
                        message.success('Editado con exito');
                        this.props.onEdit();
                    }
                )
            }
        }else
            message.error('Todos los campos son requeridos');
    };

    render() {
        return (
            <div>
                <Spin spinning={false} tip='Registrando...' indicator={LoadingSpin}>
                    <Form onSubmit={this.handleOnSubmit}>
                        <Input.Group>
                            <Col md = {{span: 10}}>
                                <Title level={4}>Nombre</Title>
                                <Input
                                    prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Ingrese El nombre del libro"
                                    name='name'
                                    value={this.state.name}
                                    onChange={ this.handleOnChange }
                                />
                            </Col>
                            <Col md = {{span: 10, offset:1}}>
                                <Title level={4}>Autor</Title>
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Ingrese el nombre del Autor"
                                    name='autor'
                                    value={this.state.autor}
                                    onChange={ this.handleOnChange }
                                />
                            </Col>
                        </Input.Group>



                        <Input.Group className={'mt-4'}>
                            <Col md = {{span: 10}}>
                            <Title level={4}>Precio</Title>
                            <Input
                                type='number'
                                prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Precio del libro"
                                name='price'
                                value={this.state.price}
                                onChange={ this.handleOnChange }
                            />
                            </Col>
                            <Col md = {{span: 10, offset:1}}>
                                <Title level={4}>Sinopsis</Title>
                                <TextArea
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Sinopsis"
                                    name='sinopsis'
                                    value={this.state.sinopsis}
                                    onChange={ this.handleOnChange }
                                />
                            </Col>
                        </Input.Group>

                            <Form.Item>
                                <Col md = {{span: 21}}>
                                    <Title level={4}>Portada</Title>
                                    <Upload {...this.fileProps} >
                                        <Button disabled={this.state.file!==undefined}>
                                            <Icon type="upload" /> Subir archivo
                                        </Button>
                                    </Upload>
                                </Col>
                            </Form.Item>

                        <Col>
                            <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        {
                                            this.props.book !== undefined ? 'Editar' : 'Crear'
                                        }
                                    </Button>
                            </Form.Item>
                        </Col>

                    </Form>
                </Spin>
            </div>
        )
    }
}

export default CreateBook;