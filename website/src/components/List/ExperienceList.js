import React from 'react';

import {Grid} from '@material-ui/core';


import InfoArea from '../InfoArea/InfoArea';

import PersonIcon from '@material-ui/icons/Person';




export default function ExperienceList(props){
    const data = props.data || [];
    return(
        
        <>
            <Grid display="flex" container>
                {data.map((obj,index)=>{
                    return(
                        <Grid key = {index} item md={12}>
                            <InfoArea
                                fullWidth
                                id = {obj.id}
                                title={obj.title}
                                description={`Interview with ${obj.company_name} for role of ${obj.designation} with ${obj.no_of_rounds} rounds.`}
                                icon={PersonIcon}
                                iconColor="rose"
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
        
    );
}
