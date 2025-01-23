import React from 'react';
import './style.css'

interface Props{
    number:string
}
const PostionCircle= (props:Props) => {
  return (
    <div className="pos-circle">
        {props.number}
    </div>
  );
};

export default PostionCircle;