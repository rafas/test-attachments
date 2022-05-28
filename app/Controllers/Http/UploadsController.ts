// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Upload from 'App/Models/Upload'
import UploadValidator from 'App/Validators/UploadValidator'

export default class UploadsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 100)
    const uploads = await Upload.query().orderBy('id', 'desc').paginate(page, limit)
    return uploads
  }

  public async store({ request }: HttpContextContract) {
    const requestPost = await request.validate(UploadValidator)
    const attachment = await ResponsiveAttachment.fromFile(requestPost.image)

    const upload = new Upload()
    upload.image = attachment
    await upload.save()

    return upload
  }
}
