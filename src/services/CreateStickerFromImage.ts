import { decryptMedia, Client, Message } from '@open-wa/wa-automate'

export default async function CreateStickerFromImage(
  client: Client,
  message: Message
) {
  const { mimetype, from, sender } = message

  console.log(message)

  await client.sendText(
    from,
    `*${sender.pushname}*, sua figurinha está sendo criada, aguarde! 🤩`
  )

  const mediaData = await decryptMedia(message)
  const base64data = mediaData.toString('base64')

  await client
    .sendImageAsSticker(from, `data:${mimetype};base64,${base64data}`)
    .catch(async reason => {
      console.log(reason)

      await client.sendText(
        from,
        '_Infelizmente(ou felizmente) devido a alta demanda, as figurinhas estão temporariamente desabilitadas._'
      )
    })
}
