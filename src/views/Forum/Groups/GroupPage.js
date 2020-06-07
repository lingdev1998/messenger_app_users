import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import Posts from '../Post/Posts'
export const GroupPage = (props) => {

    useEffect(() => {

    }, [props.match.params.id]);
    return (
        <>
            <Posts id={props.match.params.id} />
        </>
    );
}

export default GroupPage;