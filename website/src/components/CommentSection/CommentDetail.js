import React from 'react';
import faker from 'faker';

const CommentDetail =(props) =>{
    const author = props.author||'temp';
    return(
        <div className="comment">
                <a href="/profile" className="avatar">
                    <img alt="avatar" src={props.img}/>
                </a>
                <div className="content">
                    <a href="/profile" className="author">
                    {author.username}
                    </a>
                    <div className="metadata">
                        <span className="date"> {props.timeago}</span>
                    </div>
                    <div className="text"> {props.msg} </div>
                </div>
            </div>
    );
};

export default CommentDetail;