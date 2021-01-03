import { decryptMedia, Client, Message } from '@open-wa/wa-automate'

export default async function CreateAnimatedStickerFromVideo(
  client: Client,
  message: Message
) {
  const { mimetype, from, sender } = message

  await client.sendText(
    from,
    `*${sender.pushname}*, estou criando a sua figurinha aguarde. 🤩

_As figurinhas animadas são feitas a partir dos primeiros 5 segundos de video._
    `
  )

  const mediaData = await decryptMedia(message)
  const base64data = mediaData.toString('base64')

  await client
    .sendMp4AsSticker(from, `data:${mimetype};base64,${base64data}`)
    .catch(async reason => {
      console.log(reason)

      await client.sendText(
        from,
        '_Infelizmente(ou felizmente) devido a alta demanda, as figurinhas animadas estão temporariamente desabilitadas._'
      )
    })
}
