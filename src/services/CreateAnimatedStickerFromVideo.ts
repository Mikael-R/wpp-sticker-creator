import { decryptMedia, Client, Message } from '@open-wa/wa-automate'

export default async function CreateAnimatedStickerFromVideo(
  client: Client,
  message: Message
) {
  const { mimetype, from, sender } = message
  const senderVocative = sender.pushname || sender.formattedName

  await client.sendText(
    from,
    `*${senderVocative}*, estou criando a sua figurinha aguarde. 🤩

_As figurinhas animadas são feitas a partir dos primeiros 5 segundos de video._
    `
  )

  const mediaData = await decryptMedia(message)
  const base64data = mediaData.toString('base64')

  client
    .sendMp4AsSticker(from, `data:${mimetype};base64,${base64data}`)
    .catch(reason => {
      console.log(sender.formattedName, reason)

      client.sendText(
        from,
        '_Não foi possível criar sua figurinha, há algo de errado com seu arquivo._ 🤔'
      )
    })
}
