import React from 'react';

import './home.css';
// our own imports
import AdminLayout from '../../../common/components/layouts/admin-layout';
import {Post} from './../utils/interfaces/post.interface';
import {connect} from 'react-redux';
import {ADD_POST, FILTER_POST} from './../../../common/store/actions/postActions';
import reducer from '../../../common/store/reducers/reducer';
import PostListComponent from './../components/post-list/post-list.component';
interface homeState {
    title: string,
    text: string,
    // postList: Post[],
    activeTab: number,
    searchText: string,
    titleError: string,
}
interface homeProps {
    postList: Post[],
    filterPostList: Post[],
    addPost: any,
    dispatch: any,
}
class Home extends React.Component<homeProps, homeState> {
    
    constructor(props:any) {
        super(props);
        this.state = {
            activeTab: 1,
            title: '',
            text: '',
            // postList: [
            //             {title: 'test1', text: 'test2'},
            //             {title: 'test1', text: 'test2'},
            //             {title: 'test1', text: 'test2'}
            //         ],
            searchText: '',
            titleError: 'whitesmoke',
        }
        this.showNewPostForm = this.showNewPostForm.bind(this);
        this.showPublishList = this.showPublishList.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.clear = this.clear.bind(this);
        this.filter = this.filter.bind(this);
        
    }
    
    render() {
        
        return (
            <AdminLayout >
                <div className="post-wapper">
                    <div className="search-box-wrapper clearfix">
                        <div className="search-box">
                            <div className="search-icon">
                                <img src="https://lh3.googleusercontent.com/proxy/WK4x-4FU5oYalQ4cV0nTD8RUGTMA9blAhM9X150CY4QCjR4O8ZhFJAIZV5npEoRGfOfvKcWdiib2IZJqOuete0AMEzQOkGA_lVqEgSrb8Az4wz-9PY4" 
                                height="30px" width="30px" alt="Logo" style={{marginTop: '5px', cursor: 'pointer'}} onClick={this.filter} />
                                </div>
                            <div className="input-text">
                                <input type="text" value={this.state.searchText} onChange={(event) => this.setState({searchText: event.target.value})}
                                 className="search-text-box" placeholder="Search..."></input>
                            </div>
                            <div className="clear-icon">
                                <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/clear-16-216586.png" 
                                height="30px" width="30px" alt="Logo" style={{marginTop: '5px', cursor: 'pointer'}} onClick={this.clear}/>
                            </div>
                        </div>
                    </div>
                    <div className="post-content clearfix">
                        <div className="post-tab-wrapper clearfix">
                            <button className="tab-buttons" onClick={this.showNewPostForm}>New Post</button>
                            <button className="tab-buttons" onClick={this.showPublishList}>All Published Post</button>
                        </div>
                        {
                            this.state.activeTab === 1 &&
                                <div className="post-form-wrapper">
                                    <div className="form-row">
                                        <label>Title</label>
                                        <div className="form-row-control">  
                                            <input type="text" style={{borderColor: this.state.titleError}} value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}></input>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label>Text</label>
                                        <div className="form-row-control">  
                                            <input type="text" value={this.state.text}  onChange={(event) => this.setState({text: event.target.value})}></input>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-row-control">  
                                            <button className="btn-custom" onClick={this.addNewPost}>Published</button>
                                        </div>
                                    </div>
                                </div>
                        }
                        {
                            this.state.activeTab === 2 && 
                            // <div className="post-list-wrapper">
                            //     {this.props.postList.map((post: Post, index) => (
                            //         <div className="post-list-row">
                            //             <div><h3>{post.title}</h3></div>
                            //             <div>{post.text}</div>
                            //         </div>
                            //         ))
                            //     }
                                
                            // </div>
                            <PostListComponent postList={this.props.postList} />
                        }
                        {
                            this.state.activeTab === 3 && 
                            // <div className="search-result-wrapper">
                            //     <div className="post-list-wrapper">
                            //         {this.props.filterPostList.map((post: Post, index) => (
                            //             <div className="post-list-row">
                            //                 <div><h3>{post.title}</h3></div>
                            //                 <div>{post.text}</div>
                            //             </div>
                            //             ))
                            //         }
                                    
                            //     </div>
                            // </div>

                            <PostListComponent postList={this.props.filterPostList} />
                        }
                        
                    </div>
                </div>
            </AdminLayout>
        )
    }
    showNewPostForm() {
        this.setState({
            activeTab: 1
        });
    }
    showPublishList () {
        this.setState({
            activeTab: 2
        });
    }
    addNewPost() {
        if(this.state.title.trim() === '') {
            this.setState({
                titleError: 'red'
            });
            alert('Please enter title');
            return;
        }
        // this.setState({
        //     postList: [...this.state.postList, {title: this.state.title, text: this.state.text}],
        //     title: '',
        //     text: ''
        // }, function() {
        //     alert('post created successfully');
        // });
        this.props.dispatch({
            type: ADD_POST,
            payload: {
                title: this.state.title,
                text: this.state.text
            }
        });
        this.setState({
            title: '',
            text: '',
            titleError: 'whitesmoke'
        }, function () {
            alert('post created successfully');
        })
    }
    clear() {
        this.props.dispatch({
            type: FILTER_POST,
            payload: {
                searchText: '',
            }
        });
        this.setState({
            activeTab: 3,
            searchText: '',
        })
    }
    filter() {
        this.props.dispatch({
            type: FILTER_POST,
            payload: {
                searchText: this.state.searchText,
            }
        });
        this.setState({
            activeTab: 3
        })
    }
}

const mapStateToProps = (state: any) => {
    return {
        age: state.age,
        postList: state.postList,
        filterPostList: state.filterPostList
    };
};

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         onAgeUp: () => dispatch({ type: "AGE_UP", value: 1}),
//         onAgeDown: () => dispatch({ type: "AGE_DOWN", value: 1}),
//     }
// }
// export default Home;
export default connect(mapStateToProps, null)(Home);


