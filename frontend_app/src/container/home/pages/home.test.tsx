import React, { Component }  from 'react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import configureStore from 'redux-mock-store' //ES6 modules
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Home from './home';
import {ADD_POST} from './../../../common/store/actions/postActions';

const middlewares: any = []
const mockStore = configureStore(middlewares);
let container:any = null;
let store: any;
let component:any;
beforeEach(() => {
  
    store = mockStore({
        age: 22,
        postList: [],
        filterPostList: [],
    });

    store.dispatch = jest.fn();

    component = renderer.create(
        <Provider store={store}>
            <Home postList={[]} filterPostList={[]} addPost={''} dispatch={''} />
        </Provider>
    );
});


 it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 

 