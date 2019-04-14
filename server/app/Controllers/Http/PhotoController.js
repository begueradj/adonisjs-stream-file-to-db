'use strict'

const Photo = use('App/Models/Photo')
// const Database = use('Database')
const getStream = use('get-stream')

class PhotoController {

  async store({ request, response }) {
    let photo = {}
    request.multipart.file('file', {}, async function(file) {
      const fileContent = await getStream.buffer(file.stream)
      photo.filecontents = fileContent
      photo.type = `${file.type}/${file.subtype}`
    })
    
    try {
      await request.multipart.process()
    } catch(e) {
      console.log(e.message)
    }
    
    const photoInstance = new Photo()
    photoInstance.file = photo.filecontents
    photoInstance.type = photo.type
    try {
      await photoInstance.save()
    } catch(e) {
      console.log(e.message)
    }
    response.status(201)
  }

  async show({ request, response, params }) {
    try {
      // const photo = await Database
      //  .table('photos')
      //  .select('file')
      //  .where('id', params.id)
      const photo = await Photo.find(params.id)
      response.header('content-type', 'image/jpg')
      response.header('content-length', Buffer.byteLength(photo.file))
      // response.send(photo[0].file)
      response.send(photo.file)
    } catch(e) {
      console.log(e.message)
    }
  }
  
}

module.exports = PhotoController
