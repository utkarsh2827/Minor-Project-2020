import React, {useState} from 'react';

const AddComment = (props) =>{
    
    
    return (
    <div className="ui segment" >
        <form className="ui form">
            <div className="field">
                <input type="text"
                placeholder="Add comment" 
                name = "comment_text"
                value={props.newComment}
                onChange={props.onChange}
                />
            </div>
            <button className="btn" 
            onClick= {props.onSubmit}> 
            Add Comment
            </button>
        </form>
    </div>
    );
};

export default AddComment;