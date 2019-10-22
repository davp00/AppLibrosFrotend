import React, { Component } from 'react';
import LoadingSpin from "./LoadingSpin";
import {Spin, Typography, Popconfirm, Icon, message, Avatar} from "antd";
import axios from 'axios';
import {API_URL} from "../config";
import { Table } from 'antd';

const { Title } = Typography;
const { Column } = Table;

class BookList extends Component{

    state = {
        loading: true,
        books: []
    };

    componentWillMount() {
        document.title = 'Lista de Libros';
        axios.get(`${API_URL}/api/book`).then(
            ({data})=>
            {
                this.setState({books: data, loading: false});
                console.log(this.state);
            }
        ).catch(
            ( ) =>
            {
                this.setState({loading: false});
            }
        )
    }

    deleteBook = ( book ) =>
    {
        axios.get(`${API_URL}/api/book/delete/${book.book_id}`).then(
            ( ) =>
            {
                this.setState((state)=>
                {
                    state.books = state.books.filter((b, i) =>
                    {
                        return book.book_id !== b.book_id;
                    });
                    return state;
                })
            }
        ).catch(
            ()=>
            {
                message.error('Ha ocurrido un error');
            }
        )
    };

    render() {
        return (
            <div>
                <Spin spinning={this.state.loading} tip='Cargando...' indicator={LoadingSpin}>
                    <Title>Libros</Title>

                    <Table dataSource={this.state.books} rowKey={'book_id'}>
                        <Column title='ID' dataIndex='book_id' key="book_id" />

                        <Column title='Portada' render={(text,book)=> (
                            <Avatar size='large' src={`${API_URL}/api/book/image/${book.img_url}`}/>
                        )}/>

                        <Column title={'Nombre'} dataIndex='name' key='name'/>
                        <Column title='Autor' dataIndex='autor' key='autor' />
                        <Column title='Precio' dataIndex='price' key='price'/>
                        <Column title='Sinopsis' dataIndex='sinopsis' key='sinopsis'/>
                        <Column title='Acciones'   render={ ( text, book) => (
                            <span>
                                <span>
                                    <Popconfirm placement="topLeft"
                                                title='¿Está seguro de querer eliminar el producto?'
                                                okText='Eliminar'
                                                cancelText='Cancelar'
                                                onConfirm={ () => this.deleteBook(book) }>
                                        <Icon type='delete' theme='filled' style={{color:'#c0392b'}}/>
                                    </Popconfirm>
                                </span>
                            </span>
                        )}/>
                    </Table>
                </Spin>
            </div>
        );
    }
}

export default BookList;