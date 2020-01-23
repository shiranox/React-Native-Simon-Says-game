import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Button, Image} from 'react-native';
export default class App extends Component{ 
  constructor (props){
    super(props);
    this.flash=0
    this.numOfSequences=5 //the length of the given sequence to be 
    this.round
    this.seq=[] 
    this.score=0
    this.mainSeq=[]
    this.mainSeqCounter=0
    this.state = {
      clickDisable: true,
      greenB: {
        backgroundColor: 'darkgreen'
      },
      yellowB: {
        backgroundColor: 'orange'
      },
      blueB: {
        backgroundColor: 'blue'
      },
      redB: {
        backgroundColor: 'red'
      }
    }
    this.play=this.play.bind(this)
    this.greenFlash=this.greenFlash.bind(this)
    this.blueFlash=this.blueFlash.bind(this)
    this.redFlash=this.redFlash.bind(this)
    this.playerTurn=this.playerTurn.bind(this)
    this.flashTheButton=this.flashTheButton.bind(this)
  }

  play(){
    for (var i=0; i<this.numOfSequences; i++) {
      this.mainSeq.push(Math.floor(Math.random()*4)+1);
    }
    this.seq.push(this.mainSeq[this.mainSeqCounter]) 
    this.compTurn()
    this.setState({ clickDisable: false })
    this.numberOfClick=-1;
    }
   
  playerTurn(i){
    this.numberOfClick++
    if (this.seq[this.numberOfClick]==i){
      this.flashTheButton(i)
      if(this.seq.length == this.numberOfClick+1){
        if(this.seq.length == this.mainSeq.length){
          alert("You Won The Game")
          this.mainSeqCounter = 0
          this.seq=[]
          return
        }
        this.mainSeqCounter++
        this.seq.push(this.mainSeq[this.mainSeqCounter])
        this.compTurn()
        this.numberOfClick=-1;
      }      
    }
    else{
      this.setState({clickDisable: true})
      this.mainSeqCounter = 0
      this.seq=[]
      alert("game over")
    }    
  }
  flashTheButton(i){ 
    if (i == 1){
        this.greenFlash();
      }
      if (i==2){
        this.yellowFlash();
      }
      if (i==3){
        this.blueFlash();
      }
      if (i==4){
        this.redFlash();
      }
    }

    compTurn() {
      var i =0;
      let intervalId = setInterval(()=> {
      if (this.seq.length == i) {
        clearInterval(intervalId);
      }
      else {
        if (this.seq[this.flash]==1){
          this.greenFlash();
        }
        if (this.seq[this.flash]==2){
          this.yellowFlash();
        }
        if (this.seq[this.flash]==3){
          this.blueFlash();
        }
        if (this.seq[this.flash]==4){
          this.redFlash();
        }
        this.flash++;
      }
      i++;
    }
    , 1000);   
    this.flash=0;
}
  greenFlash(){
      setTimeout(() => {
        this.setState( {
            greenB:{
              ...this.state.style1, backgroundColor: 'lightgreen'
            }
            })
        }, 200);
      setTimeout(() => {
        this.setState( {
            greenB:{
              ...this.state.style1, backgroundColor: 'darkgreen'
            }
            })
        }, 1000);
  } 

  yellowFlash(){
    setTimeout(() => {
      this.setState( {
          yellowB:{
            ...this.state.style1, backgroundColor: 'yellow'
          }
          })
      }, 200);
    setTimeout(() => {
      this.setState( {
          yellowB:{
            ...this.state.style1, backgroundColor: 'orange'
          }
          })
        }, 1000);
  }

  blueFlash(){
    setTimeout(() => {
      this.setState( {
          blueB:{
            ...this.state.style1, backgroundColor: 'lightblue'
          }
          })
      }, 200);
    setTimeout(() => {
      this.setState( {
          blueB:{
            ...this.state.style1, backgroundColor: 'blue'
          }
          })
        }, 1000);
  }

  redFlash(){
    setTimeout(() => {
      this.setState( {
          redB:{
            ...this.state.style1, backgroundColor: 'pink'
          }
          })
      }, 200);
    setTimeout(() => {
      this.setState( {
          redB:{
            ...this.state.style1, backgroundColor: 'red'
          }
          })
        }, 1000);
  }

  render(){
    return (
      <View>
        <TouchableOpacity style={styles.playB}
        onPress={this.play}> 
        <Text style={{
          color:'white',
          alignSelf: 'center',
          marginTop: 20
          }}>START</Text>
        </TouchableOpacity>
        <Text style={{
          alignSelf: 'center',
          marginTop: 70,
          fontSize: 25
          }}> Score: {this.mainSeqCounter}</Text>
        <TouchableOpacity style={[
          styles.greenB,
          this.state.greenB]} 
          disabled={this.state.clickDisable}
          onPress={()=> this.playerTurn(1) }></TouchableOpacity>
        <TouchableOpacity style={[
          styles.yellowB,
          this.state.yellowB]} 
          disabled={ this.state.clickDisable}
          onPress={()=> this.playerTurn(2) }></TouchableOpacity>
        <TouchableOpacity style={[
          styles.blueB,
          this.state.blueB]} 
          disabled={this.state.clickDisable}
          onPress={()=> this.playerTurn(3) }></TouchableOpacity>
        <TouchableOpacity style={[
          styles.redB,
          this.state.redB]} 
          disabled={this.state.clickDisable}
          onPress={()=> this.playerTurn(4) }></TouchableOpacity>  
      </View>
    );
  }
}
const styles = StyleSheet.create({
  greenB:{
    padding: 5,
    height: 110,
    width: 110,  
    borderRadius:160,    
    position: 'absolute',
    top:380,
    left: 80
  },
  yellowB:{
    padding: 5,
    height: 110,
    width: 110,  
    borderRadius:160,   
    position: 'absolute',
    left: 80,
    top: 520
  },
  blueB:{
    padding: 5,
    height: 110,
    width: 110,  
    borderRadius:160,   
    position: 'absolute',
    top: 380,
    left: 210
  },
  redB:{
    padding: 5,
    height: 110,
    width: 110,  
    borderRadius:160, 
    position: 'absolute',
    left: 210,
    top: 520
  },
  playB:{   
    marginTop: 150,
    width: 150,
    backgroundColor: 'grey',
    height: 60,
    borderRadius: 40,
    alignSelf: 'center'  
  },
});