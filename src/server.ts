import 'dotenv/config'
import { create, Client } from '@open-wa/wa-automate'

import CreateAnimatedStickerFromVideo from './services/CreateAnimatedStickerFromVideo'
import CreateStickerFromImage from './services/CreateStickerFromImage'

create({ sessionData: process.env.SESSION_DATA }).then(client => start(client))

function start(client: Client) {
  client.onMessage(async message => {
    const { type, isGroupMsg } = message

    // Generate sticker from an image
    if (isGroupMsg === false && type === 'image') {
      await CreateStickerFromImage(client, message)
    }

    // Generate an animated sticker from a video
    if (isGroupMsg === false && type === 'video') {
      await CreateAnimatedStickerFromVideo(client, message)
    }
  })

  client.onAddedToGroup(({ id }) => client.leaveGroup(id.server))
}
