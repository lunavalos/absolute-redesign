import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from './payload.config'

async function resetAdmin() {
  const email = process.argv[2] || 'admin@absolute.com'
  const password = process.argv[3] || 'AdminPassword123!'

  console.log(`\nIniciando reset/creación de usuario admin...`)
  console.log(`Email: ${email}`)

  const payloadConfig = await configPromise
  const payload = await getPayload({ config: payloadConfig })

  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existingUsers.docs.length > 0) {
    const user = existingUsers.docs[0]
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: password,
        role: 'admin',
      },
    })
    console.log(`✅ ¡Contraseña actualizada exitosamente para ${email}!`)
  } else {
    await payload.create({
      collection: 'users',
      data: {
        name: 'Administrador',
        email: email,
        password: password,
        role: 'admin',
      },
    })
    console.log(`✅ ¡Usuario administrador ${email} creado exitosamente!`)
  }

  console.log(`\nCredenciales para ingresar a Payload CMS (http://localhost:3001/admin):`)
  console.log(`  Email:      ${email}`)
  console.log(`  Contraseña: ${password}\n`)

  process.exit(0)
}

resetAdmin().catch((err) => {
  console.error('❌ Error al restablecer usuario admin:', err)
  process.exit(1)
})
