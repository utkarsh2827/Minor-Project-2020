import React, {useEffect, useState} from 'react';


import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import BasicInfoForm from "../components/Forms/BasicInfoForm";
import RoundForm from "../components/Forms/RoundForm";

import {useAuth} from '../auth.js';

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function IntExpForm(props){

    const { ...rest } = props;
    const [basicForm, setBasicForm] = useState({
        company_name:'',
        profile:'',
        no_of_rounds:1,
        compensation:'',
        university_name:'',
        years_of_experience:0,
        additional_info:''
    });
    const {authTokens, setAuthTokens} = useAuth();

    const [form, setForm] = useState([[{question:'', link:'NA', answer:'NA'}]]);
    const handleBasicChange = (event)=>{
        setBasicForm({...basicForm, [event.target.name]:event.target.value});
        var values = [];
        if(form.length < basicForm.no_of_rounds){
            values = form;
            for(var i = 0;i<(basicForm.no_of_rounds-form.length);i++){
                values.push([{question:'', link:'NA', answer:'NA'}]);
            }   
            setForm(values);
        }
        if(form.length>basicForm.no_of_rounds){
            values = form;
            for(i = 0; i<form.length-basicForm.no_of_rounds;i++){
                values.pop();
            }
            setForm(values);
        }
    }
    const handleChange = (primaryindex, secondaryindex, e)=>{
        var values = [...form];
        values[primaryindex][secondaryindex][e.target.name] = e.target.value;
        setForm(values);
    }
    const handleAddFields = (index) => {
        
        let fields = [...form];
        fields[index].push({question:'', link:'NA', answer:'NA'});
        setForm(fields);
        console.log(form);
    }
    const handleRemoveFields = (index)=>{
        let fields = [...form];
        if(fields[index]>1)
            fields[index].pop();
        setForm(fields);
    }


    const handleSubmit = ()=>{
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        }
        let token = authTokens.token;
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        const body = {'basicInfo':basicForm, 'roundInfo':form}
        axios.post('/api/exp/',body, config )
        .then(res => {
            console.log(res.data);
            window.location.replace("/experience-list");
        })
        .catch(err=>console.log(err));
        
    }

    useEffect(()=>{console.log('Updating')},[basicForm]);
    useEffect(()=>{console.log('Updating form')}, [form]);
    const getRoundForms = (values)=>{

        return( values.map((value, index)=>{
            return(<RoundForm key={index} index = {index} fields={value} onChange={handleChange} addField = {handleAddFields} removeField = {handleRemoveFields}/>);
        }));
    }


    return(
        <>
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="dark"
                {...rest}
            />
            <Container>
                <BasicInfoForm values = {basicForm} onChange={handleBasicChange}/>
                {getRoundForms(form)}

                <Box display="flex" p ={2} m={2}flexDirection="row-reverse">
                    <Box >
                        <Button onClick={handleSubmit}  size = "large" color="primary" >Submit</Button>
                    </Box>
                </Box>
            </Container>
        </>
        

    );
}