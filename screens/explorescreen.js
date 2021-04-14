import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInputComponent, TextInput, Image, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import db from '../db ';
import * as firebase from 'firebase';

export default class explorescreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AllTransations: [],
      recentTransations:null,
      searchBar :''
    }
  }

  componentDidMount = async () => {
    const transationsDone = await db.collection("Transation").get()
    transationsDone.docs.map((doc) => {
      this.setState({
        AllTransations: [...this.state.AllTransations, doc.data()]
      })
    })
  }

  fetchTransations = async()=>{
    var idEntered = this.state.searchBar
    var splitId = idEntered.split("")
    if(splitId[0] === "b"){
      const bookIds = await db.collection("Transation").where('bookId', '==', idEntered).startAfter(this.state.recentTransations).limit(10).get()
      bookIds.docs.map((doc)=>{
        this.setState({
          AllTransations : [...this.state.AllTransations, doc.data()],
          recentTransations : doc
        })
      })
    }else if(splitId[0] === "s"){
      const studentIds = await db.collection("Transation").where('studentId','==',idEntered).startAfter(this.state.recentTransations).limit(10).get()
      studentIds.docs.map((doc)=>{
        this.setState({
          AllTransations : [...this.state.AllTransations, doc.data()],
          recentTransations : doc
        })
      })
    }
  }

  serchTransations =async(text)=>{
    var id = text.split("")
    if(id[0] === "b"){
      const bookIds = await db.collection("Transation").where('bookId', '==', text).get()
      bookIds.docs.map((doc)=>{
        this.setState({
          AllTransations : [...this.state.AllTransations, doc.data()],
          recentTransations : doc
        })
      })
    }else if(id[0] === "s"){
      const studentIds = await db.collection("Transation").where('studentId','==',text).get()
      studentIds.docs.map((doc)=>{
        this.setState({
          AllTransations : [...this.state.AllTransations, doc.data()],
          recentTransations : doc
        })
      })
    }
  }
  

  render() {
    return (
      <View>
      <View>
      <TextInput 
      style={styles.textinput}
      placeholder = "Student ID Or Book ID"
      onChangeText={(text)=>{this.setState({
        searchBar : text
      })}}
      />
      <TouchableOpacity style = {styles.submitstyle}
      onPress={()=>{this.serchTransations(this.state.searchBar)}}><Text style = {styles.buttonTextStyle}>SEARCH</Text></TouchableOpacity>
      </View>

      <FlatList
        data = {this.state.AllTransations}
        renderItem = {({ item }) => (
          <View style={styles.viewStyle}>
            <Text>{"Book ID: " + item.bookId}</Text>
            <Text>{"Student ID: " + item.studentId}</Text>
            <Text>{"Transation Type: " + item.transationType}</Text>
            <Text>{"Date: " + item.date.toDate()}</Text>
          </View>
        )}
        keyExtractor={(item,index) => index.toString()}
        onEndReached = {this.fetchTransations}
        onEndReachedThreshold = {0.7}
      />  
      </View>
      )
  }
}

const styles = StyleSheet.create({
  headingStyle: {
    fontSize: 10,
    color: "black",
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginTop: 50,
    fontSize: 50
  },
  viewStyle: {
    flex: 1,
    borderWidth: 5,
    marginTop: 50
  },
  textinput: {
    marginLeft: 90,
    padding: 10,
    borderWidth: 5,
    marginTop:50,
    width: 300,
    height: 50,
    alignSelf:'center',
    marginRight:80
  },
  submitstyle:{
    fontSize:15,
    alignSelf:'center',
    color:'#f8f4e1',
    backgroundColor: 'brown',
    margin:10,
    width: 120,
    height: 45,
    borderWidth:5,
    borderRadius:50,
    textAlign:'center',
    textAlignVertical:'center',
    marginTop:5

  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8f4e1',
    textAlign: 'center'
  },
})
