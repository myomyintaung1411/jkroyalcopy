/*eslint-disable*/
import global from "@/utils/global";
import AES from "@/utils/aes";
import store from "@/store";

// import AES from '../api/aes'
// import message from '../components/Message/index'
// import { Notification } from "element-ui"
function doData(rData) {
  const en = global.gameEn
  rData = JSON.parse(AES.decrypt(rData, en))
  switch (rData.router) {
    case 'Login':
      SetMyCenterForm(rData)
      break;
    case 'getDeskLists':
      getDeskLists(rData)
      break;
  
    default:
      break;
  }
}

function eventMsg(msg){
  const en = global.gameEn
  msg = JSON.parse(AES.decrypt(msg, en))
  //console.log(msg,"eventMsg *********");
  let demsg = JSON.parse(msg.value)
  console.log(demsg,"demsg eventMsg *********");
  updateState(demsg)
}
function updateState(msg)
{
  let gameType = ''
  if(msg.game_type == 'Baccarat'){
    gameType = 'bjl'
  }
  if(msg.game_type == 'DragonTiger'){
    gameType = 'lh'
  }
  if(msg.game_type == 'Bullfight'){
    gameType = 'nn'
  }
  let tableinfoData = store.state.app.allTableInfo
  if(tableinfoData.length == 0){
    return
  } 
  for (let i = 0; i < tableinfoData.length; i++) {
   // const element = array[index];
    if(tableinfoData[i].roomId == msg.table_no && tableinfoData[i].rType == gameType){
      tableinfoData[i].state = msg.state_code
    }
  }
  store.commit('app/ALL_TABLE_INFO',tableinfoData)
}
// function getDeskLists(rData) {
//   console.log(rData , 'getDeskLists *******');
//  if (rData.data && rData.data.length > 0) {
    
// }
// }

// function SetMyCenterForm (rData) {
//  console.log(rData + 'SetMyCenterForm *******');
// }

// function StartBet (rData) {
//  console.log(rData + 'StartBet *******');
// }

// function StopBet (rData) {
//  console.log(rData + 'StopBet *******');
// }
// function SelectCardResult (rData) {
//  console.log(rData + 'SelectCardResult *******');
// }
// function  Result(rData) {
//  console.log(rData  + 'result *******');
// }
// function  SendResult(rData) {
//  console.log(rData  + 'SendResult *******');
// }

export default {
  doData,
  eventMsg
};
