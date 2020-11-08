import React, {useState} from 'react';

const AddComment = (props) =>{
    const [term,setTerm] =  useState('')

    const onFormSubmit=(event)=>{
    event.preventDefault();
    props.onSubmit(term);
    }
 
    return (
    <div className="ui segment" >
        <form className="ui form">
            <div className="field">
                <input type="text"
                placeholder="Add comment"
                value={term}
                onChange={(e)=> setTerm(e.target.value)}
                />
            </div>
            <button className="btn" 
            onClick= {(event)=>onFormSubmit(event)}> 
            Add Comment
            </button>
        </form>
    </div>
    );
};

export default AddComment;