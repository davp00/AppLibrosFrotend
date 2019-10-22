import React, { Component } from 'react';
import {Button, Col, Form, Icon, Input, message, Spin} from 'antd';
import Title from "antd/lib/typography/Title";
import axios from 'axios';
import {API_URL} from "../config";
import LoadingSpin from "./LoadingSpin";
import CreateBook from "./CreateBook";

class EditBook extends  Component{

    state = {
        loading: false,
        book_id: '',
        book: undefined
    };

    componentWillMount() {
        document.title = 'Editar Libro';
    }

    handleOnSubmit = ( e ) =>
    {
        e.preventDefault();
        if(this.state.book_id.length !== 0)
        {
            this.setState({loading:true});
            axios.get(`${API_URL}/api/book/${this.state.book_id}`).then(
                ({data})=>
                {
                    this.setState({loading:false, book : data});
                }
            ).catch(
                ()=>
                {
                    message.error('Ha ocurrido un error');
                    this.setState({loading:false});
                }
            )
        }
    };

    handleOnChange = ( { target: { value } }) =>
    {
        this.setState({book_id: value});
    };

    handleOnEdit = ( ) =>
    {
        this.setState({ book: undefined } );
    };

    render() {
        return (
            <Spin spinning={this.state.loading} tip='Buscando...' indicator={LoadingSpin}>
                <Form onSubmit={this.handleOnSubmit}>
                    <Col md={{span: 8}}>
                        <Title level={3}>Buscar Libro</Title>
                        <Input
                            type='number'
                            prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Ingrese El Id del Libro"
                            name='book_id'
                            value={this.state.book_id}
                            onChange={ this.handleOnChange }
                        />
                        <Form.Item className='pt-4'>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Buscar
                            </Button>
                        </Form.Item>
                    </Col>
                </Form>
                {
                    this.state.book !== undefined && (
                        <div className='mt-4'>
                            <Col md ={{span: 20}}>

                                <Title level={3}>Editar Libro</Title>
                                <CreateBook book={this.state.book} onEdit={this.handleOnEdit}/>
                            </Col>
                        </div>
                    )
                }
            </Spin>
        );
    }
}

export default EditBook;