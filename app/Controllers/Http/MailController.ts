import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

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
    /*
    const timestamp = find(body, 'timestamp')[0]
    const transmissionId = find(body, 'transmission_id')[0]
    const type = find(body, 'type')[0]
    */
    const msgFrom: string = find(body, 'friendly_from')[0]

    console.log('From:' + msgFrom)
    if (msgFrom && msgFrom.includes(Env.get('PRODUCTION_MAIL'))) {
      console.log('sending to production ' + msgFrom)
      await axios.post(Env.get('PRODUCTION_WEBHOOK') + `/webhooks/syncMail`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else if (msgFrom && msgFrom.includes(Env.get('BETA_MAIL'))) {
      console.log('sending to beta ' + msgFrom)
      await axios.post(Env.get('BETA_WEBHOOK') + `/webhooks/syncMail`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return response.ok('ok computer')
  }
}
