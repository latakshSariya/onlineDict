import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInputComponent, TextInput, Image, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import db from '../db ';
import * as firebase from 'firebase';

export default class login extends React.Component {
    constructor(){
        super()
        this.state ={
            emailId : '',
            password :''
        }
    }
    login=async(email, password)=>{
        if(email && password){
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email , password)
                if(response){
                    this.props.navigation.navigate('Transations')
                }
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert("Wrong email or password")
                        break;
                    case 'auth/invalid-email':
                        alert("Wrong Email")
                        break;
                }
            }
        }else{
            alert("Please enter Email or Password")
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={{flex:1, justifyContent:'center', alignContent:'center'}} behavior = "padding" enabled>
                <View>
                    <Image source={require('../assets/booklogo.jpg')}
                        style={{ width: 300, height: 300, alignContent: 'center', alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: 50 }}>Library</Text>
                </View>
                <View>
                    <TextInput
                        style = {{margin: 10,
                            padding: 10,
                            borderWidth: 5,
                            marginTop:50,
                            width: 280,
                            height: 50,
                            alignSelf:'center',
                            marginRight:10}}
                        placeholder= "abc@example.com"
                        keyboardType = 'email-address'
                        onChangeText = {(text)=>{
                            this.setState({
                                emailId : text
                            })
                        }}
                    />
                    <TextInput
                        style = {{margin: 10,
                            padding: 10,
                            borderWidth: 5,
                            marginTop:30,
                            width: 280,
                            height: 50,
                            alignSelf:'center',
                            marginRight:10}}
                        placeholder= "password"
                        secureTextEntry= {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                password : text
                            })
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity
                    style={{backgroundColor: '#4e3620',
                    marginLeft: 215,
                    padding: 10,
                    marginTop: 50,
                    width: 100,
                    height: 50,
                    marginLeft:130}}
                    onPress ={()=>{
                        this.login(this.state.emailId , this.state.password)
                    }}><Text style={{fontSize: 20,
                        fontWeight: 'bold',
                        color: '#f8f4e1',
                        textAlign: 'center'}}>Login</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}