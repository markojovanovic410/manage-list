import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { emailValidator } from "../helper/emailValidator";

const Container = styled('div')`
    width: 498px;
    background-color: #2c2c02;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 30px 40px;
    .error {
        border-color: red !important;
    }
    .header {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-transform: uppercase;
        color: #F2F2F2;
    }
    .content {
        display:flex;
        flex-direction: column;
        margin-top: 40px;
    }
    .label{
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #888888;
        margin-bottom: 8px;
    }
    .input {
        color: #888888;
        background: #1C1A1D;
        border-radius: 12px;
        border: 1px solid #888888;
        height: 50px;
        padding-left: 10px;
        margin-bottom: 20px;
    }
    .button{
        width: 110px;
        height: 50px; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F2F2F2;
        font-size: 18px;
        line-height: 22px;
        border-radius: 10px;
        border: 1px solid #888888;
        margin-left: 16px;
        cursor: default;
    }
    .button.active{
        text-transform: uppercase;
        color: #000000;
        background: #FECA00;
        border: none;
    }
    .button-group{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 40px;
    }
    .description {
        display: flex;
        flex-direction: column;
        overflow : auto;
        max-height: 140px;
        padding: 10px 0px;
        
        li {
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.01em;
            color: #F2F2F2;
            margin-bottom: 6px;
        }
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
    }
    .description-layout {
        display: flex;
        flex-direction: column;
        height: 250px;
        margin-bottom: 20px;
    }
    .create-description {
        display: flex;
        flex-direction: column;
    }
    .disable {
        display: none;
    }
    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        line-height: 160%;
        color: #888888;
        margin-top:10px;
        span {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .create-container{
            display:flex;
            flex-direction: row;
            gap: 20px;
        }
        .add {
            color:#FECA00;
        }
        .icon {
            margin-right: 8px;
            font-size: 18px;
        }
    }
    
    .time-layout {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    .message {
        display: flex;
        align-items: center;
        margin-top: 10px;
        height: 20px;
    }
    .error-msg {
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: red;
    }
    .success-msg {
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    .react-time-input-picker-wrapper {
        border-radius: 12px;
        height: 50px;
        width: 40%;
        border: 1px solid #888888;
        color: #888888;
    }
    .react-time-input-picker {
        color: #888888 !important;
    }
    .react-time-input-picker input {
        color: #888888;
    }
    .arrow {
        color: #888888;
        font-size: 18px;
    }
    @media (max-width: 768px) {
        width: 300px;
        height: unset;
        .header {
            margin-bottom: 20px;
        }
        
        .button {
            margin-right: 0px;
        }
        .button-group {
            justify-content: space-between;
            margin-top: 30px;
        }
    }
`;


const EditClient = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] =useState('');
    const [mobile, setMobile] = useState('');
    const [nameError, setNameError] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(()=>{
        setIsOpen(props.isOpen);
        setName(props.content.name);
        setUsername(props.content.email);
        setMobile(props.content.phone);
    }, [props]);

    const resetStates = ()=>{
        setName('');
        setUsername('');
        setMobile('');
        setUsernameError(false);
        setIsSaving(false);
        setNameError(false);
        setMobileError(false);
    }
    const hideModal = () => {   
        resetStates();
        emptyMessage();
        setIsOpen(false);
        
        props.close();
    }
    const emptyMessage = ()=>{
        setCreateError(false);
        setCreateSuccess(false);
    }
    const onSave = () => {
        if( name === '' || 
            mobile === '' ||
            emailValidator(username)){
            setNameError(name === '');
            setUsernameError(emailValidator(username));
            setMobileError(mobile === '');
            return;
        }
        if(isSaving)
            return;
        axios.put("/api/v1/update-contact/" + props.content._id, {
            name: name,
            phone: mobile,
            email: username
          })
        .then(res=>{
            hideModal();
            props.refresh();
        })
        
    }
    return (
        <Modal
        show={isOpen}
        onHide={hideModal}
        centered
        dialogClassName="login-modal"
        >  
            <Container>
                <div className="header">
                    Edit Trainer
                </div>
                <div className="content">
                    <span className="label">
                        Name
                    </span>
                    <input 
                        className={nameError? "input error" :"input"}
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                            emptyMessage();
                            setNameError(false);
                        }}/>
                    <span className="label">
                        Email
                    </span>
                    <input 
                        className={usernameError? "input error" :"input"}
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                            emptyMessage();
                            setUsernameError(false);
                        }}/>
                   
                    <span className="label">
                        Phone Number
                    </span>
                    <input 
                        className={mobileError? "input error": "input"}
                        value={mobile}
                        onChange={e =>{
                            emptyMessage();
                            setMobileError(false);
                            setMobile(e.target.value);
                        }}/>
                   
                </div>
                <div className="button-group">
                    <span className="button" onClick={hideModal}>
                        Cancel
                    </span>
                    <span className={isSaving?"button":"button active"} onClick={onSave}>
                        Save
                    </span>
                </div>
            </Container>
        </Modal>
    );
}

export default EditClient;