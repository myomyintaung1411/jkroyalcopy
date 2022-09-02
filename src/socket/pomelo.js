
/* eslint-disable */
// import store from '../store/index'
import './PomeloClient.js'
import ws from "./ws2";
import store from '@/store/index.js';
import global from '@/utils/global.js';
import AES from '@/utils/aes.js';
var nHeartBeat = 0
var s_timer = null
var kickk = false
var reconnet_success = false
var isConn = true
var interval = null
var p_server = new Pomelo()
var p_server2 = new Pomelo()

function conn(cb) {
  var u_id = store.state.app.user.Id
  var token = store.state.app.token
  console.log(u_id,token + 'user and token');
  var msg = { uid: u_id }
  var msg2 = { userId: msg.uid, token: token, rType: 'ty' }
  console.log("&&&&&&&", msg2);
  p_server.init(
    {
      //host: process.env.NODE_ENV == 'development' ? process.env.VUE_APP_DEV_POMELO : process.env.VUE_APP_PRO_POMELO,
      host: '192.168.1.10',
      port: 8014,
      log: true
    },

    function (num) {
      console.log(num, "data");
      p_server.request('gate.gateHandler.queryEntry', msg, res => {
        console.log(res, "queryEntry");
        p_server.disconnect()
        if (res.code == 200) {
          p_server2.init(
            {
              host: res.host,
              //host: process.env.NODE_ENV == 'development' ? process.env.VUE_APP_DEV_POMELO : process.env.VUE_APP_PRO_POMELO,
              port: res.port,
              log: true
            },
            function (res) {
              console.log(res);
              if (res.code == 200) {
                p_server2.request('connector.entryHandler.entry', msg2, res => {
                  console.log('Connector res ', res)
                  if (res.code == 200) {
                    isConn = false
                    clsInterval(interval)
                    clsInterval(s_timer)
                    startTimer()
                    cb(null, res)
                  } else {
                    console.log("error");
                                        //localStorage.removeItem("t")
                    //  window.location.reload()
                    // global.loginUser()
                    // window.location.reload()
                  }
                })
              }
              else {
                console.log('Token Expired');
              }
            }
          )
        }
      })
    }
  )
}

p_server2.on('close', function (e) {
  console.log('close ', new Date())
  isConn = true
  reconnet_success = false
  clsInterval(interval)
  // 连接关闭
  if (isConn && !kickk) {
    // isConn = false
    console.log('enter close ................', isConn)
   interval = setInterval(() => {
      console.log('enter interval loop ...', isConn)
      if (isConn) {
        console.log('enter reconnect ...', isConn)
        // isConn = false
        conn(function (err, res) {
          if (res.code == 200) {
            clsInterval(interval)
            reconnet_success = true
            kickk = false;
            console.log('isConn ', isConn)
          }
        });
      }
      // isConn = true
    }, 5000)
  }
})

p_server2.on('onMsg', function (e) {
  // console.log('----onMsg------:', e)
  //ws.doData(e)
  ws.eventMsg(e)
})

p_server2.on('onKick', function (e) {
  // 被踢开
  // alert('相同账号登录！')
  isConn = false;
  kickk = true
  nHeartBeat = 0
  clsInterval(interval)
  clsInterval(s_timer)
  p_server2.disconnect()
  console.error('您的账号已登录其它游戏');
  // Swal.fire({
  //   toast: true,
  //   position: "center",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   icon: "warning",
  //   grow: false,
  //   background: "#374151",
  //   color: "#fff",
  //   title: '您的账号已登录其它游戏!',
  // })
  localStorage.clear()
  setTimeout(() => {
    kick()
  }, 1000)

  // Message.warning('相同账号登录！')
})

function kick() {
  // nHeartBeat = 0
  // p_server2.disconnect()
  // console.log("kickkkkkkkkkkkkkk");
  // clearInterval(s_timer)
  // Swal.fire({
  //   title: "Oops...",
  //   text: "相同账号登录！",
  //   icon: "error",
  //   showCancelButton: false,
  //   allowOutsideClick: false,
  //   backdrop: true,
  //   confirmButtonText: "确定",
  //   color: "#000",
  // }).then((res) => {
  //   if (res.isConfirmed) {
  //     localStorage.clear()
  //     window.location.reload()
  //   }else{
  //     window.opener = null
  //     window.open("about:blank", "_self")
  //     window.close()
  //   }
  // }).catch((e) => {
  //   console.error(e)
  // })
}

var n = 0
function send(msg, cb) {
  n = n + 1
  const en = global.gameEn
  const msgSend = AES.encrypt(JSON.stringify(msg), en)
  p_server2.request('agent.agentHandler.getMsg', msgSend, function (res) {
    // console.log('res ', res)
    cb(JSON.parse(AES.decrypt(res, en)))
  })
}

/**
 * @name clsInterval
 * @description 清除定时器函数
 * @param {timer_Interval} interval
 */
 function clsInterval(ins) {
  if(ins !== null) {
    clearInterval(ins)
    ins = null
  }
}

function startTimer() {
  clsInterval(s_timer)
  s_timer = setInterval(() => {
    chkHeartBeat(p_server2)
  }, 5000)
}

function chkHeartBeat(server) {
  var u_id = store.state.app.user.Id
  console.log('CheckHeart |Beat', nHeartBeat)
  if (nHeartBeat > 60) {
    console.log('重连时间过长...请检查网络链接或重新登录！！！')
    //alert('网络状态不佳, 需重新登录!')
    clsInterval(s_timer)
    server.disconnect()
    window.location.reload()
  }
  nHeartBeat += 5
  var msg = { uid: u_id } // 记得改
  // console.log("chkHeartBeat msg",msg);
  var route = 'agent.agentHandler.chkHardBean'
  server.request(route, msg, function (data) {
    // console.log(data,"data");
    if (data.code == '07') {
      nHeartBeat = 0
    }
  })
}
export default { conn, send, kick }
