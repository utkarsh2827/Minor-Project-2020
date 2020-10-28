import React, {useState} from 'react';

const Accordion = ({items}) => {

    const [activeIndex,setActiveIndex] = useState(null);


    const onTitleClick=(index)=>{
        if(activeIndex===index)
        {
            setActiveIndex(null);
        }
        else {
        setActiveIndex(index);
        }
    };

    const renderedItems= items.map ((item,index)=>{
        const active = index===activeIndex? 'active': '';

        const listItems = item.content.map ((i) =>{
            return <li> {i} </li>
        })

        return < React.Fragment key = {item.title}>
            <div className={`title ${active}`}
            onClick={()=>onTitleClick(index)}>
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <ul>{listItems}</ul>
            </div>
        </ React.Fragment>
    })
    return <div className="ui styled accordion">
            {renderedItems}
            
     </div>;
}

export default Accordion;