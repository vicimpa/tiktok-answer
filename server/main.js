const { WebcastPushConnection } = require('tiktok-live-connector')
const ProxyAgent = require('proxy-agent')
const { Server } = require('socket.io')
const { parse } = require('querystring')

const proxyString = ''

const agent = new ProxyAgent(proxyString)
const server = new Server({
  cors: {
    origin: '*'
  }
})

server.on('connection', (socket) => {
  const [, data] = socket.request.url.split('?')
  const { userId } = parse(data)
  console.log('Connected', userId)

  const gifts = {}
  const webcast = new WebcastPushConnection(userId, {
    enableExtendedGiftInfo: true,
    requestOptions: {
      httpsAgent: proxyString ? agent : undefined,
      timeout: 10000
    },
    websocketOptions: {
      agent: proxyString ? agent : undefined,
      timeout: 10000
    }
  })

  webcast.on('gift', ({ nickname, gift }) => {
    if (gift.repeat_end == 1) {
      let count = gifts[gift.gift_id] ?? 0
      count += gift.repeat_count
      gifts[gift.gift_id] = count
      socket.emit('new_data', gifts)
      console.log(gifts)
    }
  })


  webcast.on('error', error => {
    console.log('Error', error)
    socket.emit('error', error)
  })

  webcast.connect()

  socket.once('disconnect', () => {
    webcast.disconnect()
  })
})

server.listen(999)