import React, {useEffect, useState} from 'react';


import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import BasicInfoForm from "../components/Forms/BasicInfoForm";
import RoundForm from "../components/Forms/RoundForm";



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
    const [form, setForm] = useState([[{question:'', link:'', answer:''}]]);
    const handleBasicChange = (event)=>{
        setBasicForm({...basicForm, [event.target.name]:event.target.value});
        if(form.length < basicForm.no_of_rounds){
            var values = form;
            for(var i = 0;i<(basicForm.no_of_rounds-form.length);i++){
                values.push([{question:'', link:'', answer:''}]);
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
        fields[index].push({question:'', link:'', answer:''});
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
        const body = {'basicInfo':basicForm, 'roundInfo':form}
        axios.post('http://localhost:8000/api/exp/',body, config )
        .then(res => {
            console.log(res.data);
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