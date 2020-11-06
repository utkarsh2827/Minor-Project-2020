import React from 'react';
import Accordion from './Accordion';

const items=[
    {
        title:'Company-Wise',
        content : ['Adobe','Apple', 'Google', 'Microsoft', 'Goldman Sachs']
    },
    {
        title:'Topic-Wise',
        content :['Arrays', 'Strings', 'Linked List', 'Trees', 'Dynamic Programming', 'Greedy', 'Divide & Conquer', 'Hashmap','Graph','Tries','Stacks', 'Queues']
    }
];

export default () =>{
    return <Accordion items={items}/>;
}