import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {BsPlusCircleFill} from 'react-icons/bs';
import AddClient from './Modal/AddClient';
import EditClient from './Modal/EditClient';
import {RiPencilFill} from 'react-icons/ri';
import {AiTwotoneDelete} from 'react-icons/ai';
import axios from 'axios';

const Container = styled('div')`
    display: flex;
    padding: 40px 30px;
    flex-direction: column;
    background: #1C1A1D;
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        height: 30px;
        .title-layout {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .title {
            font-size: 24px;
            line-height: 120%;
            text-transform: uppercase;
            font-weight: bold;
            color: #F2F2F2;
            margin-right: 25px;
        }
        .button {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #FECA00;
            cursor: default;
            .icon {
                font-size: 16px;
                margin-right: 14px;
            }
        }
        .search {
            width: 260px;
            height: 50px;
            background: #1C1A1D;
            border: 1px solid #888888;
            box-sizing: border-box;
            border-radius: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 20px;
            font-size: 18px;
            line-height: 100%;
            color: #3E3E3E;
            .icon {
                font-size: 22px;
                margin-right: 12px;
            }
            .input {
                width: 100%;
                background: #1C1A1D;
                border: none;
                color: #888888;

                &:focus-visible {
                    outline: none;
                } 
            }
        }
    }
    .content {
        padding: 45px 40px;
        display: flex;
        flex-direction: column;
        gap:0 20px;
        .table-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            line-height: 160%;
            letter-spacing: 0.01em;
            color: #888888;
            padding-bottom: 10px;
            border-bottom: 1px solid #4F4F4F;
            gap: 0 20px;
        }
        .name {
            width: 100%;
            max-width: 300px;
            min-width: 150px;
        }
        .username {
            width: 100%;
            min-width: 150px;
            word-break: break-all;
        }
        .mobile {
            width: 100%;
            max-width: 150px;
            min-width: 150px;
        }
        .membership {
            width: 100%;
            min-width: 200px;
        }
        .type {
            width: 100%;
            max-width: 400px;
            min-width: 100px;
        }
        .controls {
            width: 100%;
            padding-right: 10px;
            max-width: 120px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            .edit {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background-color: #333333;
                color: #2F80ED;
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:active, &:hover {
                    background-color: #1F2F46;
                }
            }
            .activate {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                line-height: 160%;
                background: #462224;
                color:#F03F3F;
                margin-left: 6px;

                &:active, &:hover {
                    background-color: #87171d;
                }
            }
            
        }
        .table-content {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            line-height: 160%;
            color: #D6D6D6;
            max-height: calc(100vh - 200px);
            overflow: auto;
            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-track {
                background-color: #888888;
                border-radius: 100px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 100px;
                background-color: #FFCC00;
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
            }
            .table-row{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #4F4F4F;
                gap: 0 20px;
            }
        }
    }
    .control-group {
        display: none;
    }
    .controls-mobile {
        display: none;
    }
    .controls-blank {
        display: none;
        min-width: 110px;
    }
      
`;

const TableRow = ({content, openEdit, onDelete}) => {
    
    return(
        <div className="table-row">
            <span className="name">
                {content.name}
            </span>
            <span className="username">
                {content.email}
            </span>
            <span className="mobile">
                {content.phone? content.phone : 'test'}
            </span>
           
            <div className="controls">
                <span className="edit" onClick={()=>openEdit(content)}>
                    <RiPencilFill/>
                </span>
                <span 
                    className="activate"
                    onClick={()=>onDelete(content._id)}>
                    <AiTwotoneDelete />
                </span>
            </div>
        </div>
    )
}

const App = () => {
    const [isAdd, setIsAdd] =  useState(false);
    const [content, setContent] = useState([]);
    const [editContent, setEditContent] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    useEffect(()=>{
        getAllClients();
    }, [])

    const openAddModal = () => {
        setIsAdd(true);
    }
    const closeAddModal = () => {
        setIsAdd(false);
    }
    const openEditModal = (item) => {
        setEditContent(item);
        setIsEdit(true);
    }
    const closeEditModal = () => {
        setIsEdit(false);
    }

    const getAllClients = () => {
      axios
      .get("/api/v1/contacts")
      .then(res => {
          setContent(res.data.data);
        })
      .catch(err => console.log(err))
    }

    const onDelete = (index) => {
      axios.delete('/api/v1/delete-contact/' + index)
      .then(() => {
        getAllClients();
      })
      .catch(err => console.log(err))
    }
   
    return(
        <Container>
            <div className="header">
                <div className="title-layout">
                    <span className="title">
                        Client List
                    </span>
                    <span className="button" onClick={openAddModal}>
                        <BsPlusCircleFill className="icon"/>
                        Add Client
                    </span>
                   
                </div>
                {/* <div className="search">
                    <RiSearchEyeLine className="icon"/>
                    <input className="input" placeholder={t('Search Trainers')}
                        value={search} 
                        onChange={e => onSearch(e)}/>
                </div> */}
            </div>
            <div className="content-layout">
                <div className="control-group"/>
                <div className="content">
                    <div className="table-header">
                        <span className="name">
                          Name
                        </span>
                        <span className="username">
                          Email
                        </span>
                        <span className="mobile">
                          Phone Number  
                        </span>

                        <span className="controls">
                            &nbsp;
                        </span>
                        <span className="controls-blank">
                            &nbsp;
                        </span>
                        <span className="controls-mobile">
                            &nbsp;
                        </span>
                    </div>
                    <div className="table-content">
                        {
                            content.length !== 0 && content.map((item, index) => (
                                <TableRow content={item} 
                                    openEdit={openEditModal}
                                    onDelete={onDelete}
                                    number = {index}
                                    key={index}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <AddClient isOpen={isAdd} close={closeAddModal} refresh={getAllClients}/>
            <EditClient isOpen={isEdit} close={closeEditModal} refresh={getAllClients}
                content={editContent}  trainers={content} />
        </Container>
    );
}

export default App;