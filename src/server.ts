import 'dotenv/config'
import { create, Client } from '@open-wa/wa-automate'

import CreateAnimatedStickerFromVideo from './services/CreateAnimatedStickerFromVideo'
import CreateStickerFromImage from './services/CreateStickerFromImage'

create({ sessionData: process.env.SESSION_DATA }).then(client => start(client))

function start(client: Client) {
  client.onMessage(async message => {
    const { type, isGroupMsg } = message

    if (isGroupMsg === false && type === 'image') {
      await CreateStickerFromImage(client, message)
    }

    if (isGroupMsg === false && type === 'video') {
      await CreateAnimatedStickerFromVideo(client, message)
    }
  })

  client.onAddedToGroup(async ({ id }) => await client.leaveGroup(id.server))
}
