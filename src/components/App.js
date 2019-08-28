import Form from './Form';
import React, { Component } from 'react';
import Summary from './Summary';
import Table from './Table';
import * as RecordsAPI from '../utils/RecordsAPI';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Sidebar from "react-sidebar";

var firebaseConfig = {
    apiKey: "AIzaSyBWqEcrDGEnb_8ZsZGxxIwSvqhWxPWz_3c",
    authDomain: "control-d4335.firebaseapp.com",
    databaseURL: "https://control-d4335.firebaseio.com",
    projectId: "control-d4335",
    storageBucket: "",
    messagingSenderId: "1082939158178",
    appId: "1:1082939158178:web:e77e1e7a07fcabda"
};

firebase.initializeApp(firebaseConfig);


class App extends Component{
    constructor(){
        super();
        this.state={
            isLoaded: false,
            error: null,
            records:[],
            signedIn: false,
            sidebarOpen: false
        }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }
    componentDidMount(){

          // Initialize Firebase

        firebase.auth().onAuthStateChanged( user => {
            this.setState({signedIn:!!user})
        });

        RecordsAPI.getAll()
        .then(
            response => this.setState({
                records: response.data,
                isLoaded: true
            })
        ).catch(
            error => this.setState({
                isLoaded: true,
                error: error
            })
        )
    }

    addRecord(r){
        let newRecords = [ ...this.state.records, r];
        this.setState({
            records: newRecords
        });
    }

    deleteRecord(r){
        const recordIndex = this.state.records.indexOf(r);
        const newRecords = this.state.records.filter( (record, index) => index !== recordIndex);

        this.setState({
            records: newRecords
        });
    }

    updateRecord(oldNew){
        const recordIndex = this.state.records.indexOf(oldNew.old);
        let newRecords = this.state.records.map(
            (record, index)=>{
                if(index === recordIndex){
                    return oldNew.new;
                }else{
                    return record;
                }
            }
        );

        this.setState({
            records: newRecords
        });
    }

    credits(){
        let c =  this.state.records.reduce( (preVal, curItem)=>{
            if(curItem.amount > 0 ){
                return preVal += curItem.amount;
            }else{
                return preVal;
            }
        }, 0 );
        return c;
    }

    debits(){
        return this.state.records.reduce( (preVal, curItem)=>{
            if(curItem.amount < 0 ){
                return preVal += curItem.amount;
            }else {
                return preVal;
            }
        }, 0 );
    }

    balance(){
        return this.credits() + this.debits();
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render(){
        const { isLoaded, error, records } = this.state;
        let TablePlaceholder;
        if(error){
            TablePlaceholder = <div className="alert alert-danger" role="alert"> Error: {error.message} </div>;
        }else if (!isLoaded){
            TablePlaceholder = <div className="alert alert-primary" role="alert">Loading...</div>;
        }else{
            TablePlaceholder = <Table entries={records}
                   handleUpdateRecord={this.updateRecord.bind(this)}
                   handleDeleteRecord={this.deleteRecord.bind(this)}/>;
        }

        const styleButton = {
            float: "right",
        }

        const styleButton2 = {
            float: "left",
            margin: "2rem 1rem"
        }

        const headerStyle = {
            textAlign: "center",
            margin: "2rem"
        }

        const listStyle = {
            listStyle: "none",
            padding: "2rem",
            fontSize: "1.6rem",
            fontColor: "white"
        }

        const linkStyle = {
            color: "white"
        }

        return (
            

            <div className="container">
                {this.state.signedIn ?
                    <div>
                        <div>
                            <Sidebar
                                sidebar={<div>
                                    <ul>
                                        <li style={listStyle}>
                                        <a style={linkStyle} href="/">Home</a>
                                        </li>
                                        <li style={listStyle}>
                                        <a style={linkStyle} onclick="window.location = 'reporte.js'" target="_new" href="reporte">Reporte</a>

                                        </li>
                                    </ul>
                                </div>}
                                open={this.state.sidebarOpen}
                                onSetOpen={this.onSetSidebarOpen}
                                styles={{ root: {width: "12rem"}, sidebar: { background: "black", width: "15rem" } }}
                            >
                                <button className="btn btn-primary" style={styleButton2} onClick={() => this.onSetSidebarOpen(true)}>
                                    Open sidebar
                                </button>
                            </Sidebar>

                        </div>
                        <button  className="btn btn-primary" style={styleButton} onClick={() => firebase.auth().signOut()}>SignOut</button>
                        <h2 style={headerStyle}>Control de Gastos</h2>

                        <br />

                        <div className="row mb-3">
                            <Summary text="Ingresos" type="success" amount={this.credits()} />
                            <Summary text="Gastos" type="danger" amount={this.debits()} />
                            <Summary text="Balance" type="info" amount={this.balance()} />
                        </div>
                        <br />
                        <Form handleAddRecord={this.addRecord.bind(this)}/>

                        <hr />
                        <br />
                        <div>
                            {TablePlaceholder}
                        </div> 
                    </div> 
                :
                    <div>
                        <StyledFirebaseAuth 
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default App;
