import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, Dimensions, Image } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
const { width } = Dimensions.get('window')
console.reportErrorsAsExceptions = false; // copy paste this line in your App.js 

const App = () => {

    useEffect(() => {
      const init = async () => {
        // …do multiple sync or async tasks
      };
  
      init().finally(async () => {
        await RNBootSplash.hide({ fade: true });
      });
    }, []);

  const [pScore, setPScore] = useState(0)
  const [cScore, setCScore] = useState(0)
  const [play, setPlay] = useState(true)
  const [win, setWin] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [randomComp, setRandomComp] = useState(Math.floor(Math.random() * 3)
  )
  const rock = require('./assets/Images/rock.png')
  const paper = require('./assets/Images/paper.png')
  const scissors = require('./assets/Images/scissors.png')

  const CloseModal = () => {
    setPlay(false)
  }

  const closeWinModal = () => {
    setWin(false)
  }


  const SlectedItem = () => {
    if (selectedItem === 1) {
      return (
        <Image resizeMode={'contain'} source={paper} style={{ transform: [{ rotateY: '180deg' }], width: width - 200, height: undefined, aspectRatio: 1 }} />
      )
    } else if (selectedItem === 2) {
      return (
        <Image resizeMode={'contain'} source={scissors} style={{ transform: [{ rotateY: '180deg' }], width: width - 200, height: undefined, aspectRatio: 1 }} />
      )
    } else {
      return <Image resizeMode={'contain'} source={rock} style={{ transform: [{ rotateY: '180deg' }], width: width - 200, height: undefined, aspectRatio: 1 }} />
    }
  }
  const computer = [rock, paper, scissors]
  const randomGenerator = () => {
    setRandomComp(Math.floor(Math.random() * 3))
  }


  const ComputerItem = () => {
    return (
      <Image resizeMode={'contain'} source={computer[randomComp]} style={{ width: width - 200, height: undefined, aspectRatio: 1 }} />
    )
  }

  const compareHands = () => {

    if (selectedItem === randomComp) {
      return (
        <View>
          <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 22, color: 'rgb(224,224,224)', textAlign: 'center' }}>It's A Tie</Text>
        </View>
      )
    } else if (selectedItem === 0 && randomComp === 1 || selectedItem === 1 && randomComp === 2 || selectedItem === 2 && randomComp === 0) {
      return (
        <View>
          <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 22, color: 'rgb(224,224,224)', textAlign: 'center' }}>Computer Wins</Text>
        </View>
      )
    } else if (selectedItem === 1 && randomComp === 0 || selectedItem === 2 && randomComp === 1 || selectedItem === 0 && randomComp === 2) {
      return (
        <View>
          <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 22, color: 'rgb(224,224,224)', textAlign: 'center' }}>Player Wins</Text>
        </View>

      )
    }
  }


  useEffect(() => {
    selectedItem === 0 && randomComp === 1 || selectedItem === 2 && randomComp === 0 || selectedItem === 1 && randomComp === 2 ? setCScore(prev => prev + 1) : selectedItem === 1 && randomComp === 0 || selectedItem === 2 && randomComp === 1 || selectedItem === 0 && randomComp === 2 ? setPScore(prev => prev + 1) : null
  }, [randomComp, selectedItem,])


  const reset = () => {
    setCScore(0)
    setPScore(0)
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(39, 41, 68)' }}>
      <StartModal play={play} CloseModal={CloseModal} />
      <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginTop: 20 }}>
        <View>
          <Text style={{ fontFamily: 'Raleway-Regular', color: 'rgb(224,224,224)' }}>Player </Text>
          <Text style={{ fontFamily: 'Raleway-Regular', color: 'rgb(224,224,224)', textAlign: 'center' }}>{pScore}</Text>
        </View>
        <View>
          <Text style={{ fontFamily: 'Raleway-Regular', color: 'rgb(224,224,224)' }}>Computer</Text>
          <Text style={{ fontFamily: 'Raleway-Regular', color: 'rgb(224,224,224)', textAlign: 'center' }}>{cScore}</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        {
          compareHands()
        }
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
          {
            SlectedItem()
          }
          {
            ComputerItem()
          }
        </View>

        <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(0)
              ComputerItem()
              randomGenerator()

            }}
            style={{ width: 80, height: 40, backgroundColor: 'rgb(45,117,96)', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
            <Text style={{ fontFamily: 'Raleway-Regular', color: 'black', fontSize: 17 }}>rock</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(1)
              ComputerItem()
              randomGenerator()
            }}
            style={{ width: 80, height: 40, backgroundColor: 'rgb(45,117,96)', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
            <Text style={{ fontFamily: 'Raleway-Regular', color: 'black', fontSize: 17 }}>paper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(2)
              ComputerItem()
              randomGenerator()
            }}
            style={{ width: 80, height: 40, backgroundColor: 'rgb(45,117,96)', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
            <Text style={{ fontFamily: 'Raleway-Regular', color: 'black', fontSize: 17 }}>scissors</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        pScore === 10 || cScore === 10 ? <WinnerModal win={win} setWin={setWin} closeWinModal={closeWinModal} reset={reset} winner={pScore === 10 ? true : false} /> : null
      }
    </View>
  )
}

export default App;

const WinnerModal = (props) => {
  const { win, closeWinModal, winner, reset, setWin } = props

  return (
    <Modal
      animationType={'fade'}
      visible={win}
      onRequestClose={() => closeWinModal()}
    >
      <View style={{ flex: 1, backgroundColor: 'rgb(39, 41, 68)', justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'OpenSans-Bold', color: 'rgb(224,224,224)', fontSize: 22 }}>{winner ? 'Players Wins' : 'Computer Wins'}</Text>
        <TouchableOpacity
          onPress={() => {
            reset()
            closeWinModal()
            setWin(true)
          }}
          style={{ width: width - 250, height: 40, marginHorizontal: 20, backgroundColor: 'rgb(45,117,96)', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
          <Text style={{ fontFamily: 'Raleway-Regular', color: 'black', fontSize: 17 }}>Let's Play Again</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}


const StartModal = (props) => {
  const { play, CloseModal } = props
  return (
    <Modal
      animationType={'fade'}
      visible={play}
      onRequestClose={() => CloseModal()}
    >
      <View style={{ flex: 1, backgroundColor: 'rgb(39, 41, 68)', justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'OpenSans-Bold', color: 'rgb(224,224,224)', fontSize: 22 }}>Rock Paper and Scissors</Text>
        <Image source={require('./assets/splash.png')} resizeMode={'contain'} style={{ width: 200, height: undefined, aspectRatio: 1 }} />
        <TouchableOpacity
          onPress={() => CloseModal()}
          style={{ width: width - 250, height: 40, marginHorizontal: 20, backgroundColor: 'rgb(45,117,96)', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
          <Text style={{ fontFamily: 'Raleway-Regular', color: 'black', fontSize: 17 }}>Let's Play</Text>
        </TouchableOpacity>
      </View>

    </Modal>
  )
}
