import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

function find(obj: object, key: string) {
  const ret: any[] = []
  JSON.stringify(obj, (_, nested) => {
    if (nested && nested[key]) {
      ret.push(nested[key])
    }
    return nested
  })
  return ret
}

export default class MailController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const timestamp = find(body, 'timestamp')[0]
    const transmissionId = find(body, 'transmission_id')[0]
    const type = find(body, 'type')[0]

    if (transmissionId) {
      console.log(timestamp, type)
    }
    return response.ok('transmissionId not found')
  }
}
