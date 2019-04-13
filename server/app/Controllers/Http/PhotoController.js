'use strict'

const Photo = use('App/Models/Photo')
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
  
}

module.exports = PhotoController
