import React from 'react';

// imports of own components
import Header from './header/header';
import Footer from './footer/footer';


export default function AdminLayout(props: any) {
    const preventDefault = (event:any) => event.preventDefault();

    return (
        // <Container>
            <div >
                <Header />
                <div className="content">
                    {props.children}
                </div>
                <Footer />
            </div>
        // </Container>
    );    
}