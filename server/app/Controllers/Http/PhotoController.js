'use strict'

const Photo = use('App/Models/Photo')
const getStream = use('get-stream')

class PhotoController {

  async store({ request, response }) {
    request.multipart.file('file', {}, await function(file) {
      const fileContent = await getStream.buffer(file.stream)
      photo.filecontents = fileContent
      photo.type = `${file.type}/${file.subtype}`
    })
    await request.multipart.process()
    
    const productPhoto = new Photo()
    productPhoto.file = photo.filecontents
    productPhoto.type = photo.type
    productPhoto.product_name = product.name
    await productPhoto.save()
    response.status(201)
  }
  
}

module.exports = PhotoController
