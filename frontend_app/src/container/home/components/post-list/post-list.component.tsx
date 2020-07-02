import React from 'react';
import {Post} from './../../utils/interfaces/post.interface';

function PostListComponent(props: any) {
    return (
        <div className="post-list-wrapper" >
                {
                    props.postList.map((post: Post, index: number) => (
                        <div className="post-list-row" key={index.toString()}>
                            <div><h3 className="title">{post.title}</h3></div >
                            <div className="text">{post.text}</div>
                        </div>
                    ))
                }
                {
                    props.postList.length === 0 && <div>Data not found</div> 
                }
        </div>
    )
}

export default PostListComponent;