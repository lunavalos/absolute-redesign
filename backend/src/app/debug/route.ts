import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const mediaDir = path.resolve(process.cwd(), 'media')
    const seedDir = path.resolve(process.cwd(), 'media_seed')
    
    let mediaFiles = []
    let seedFiles = []
    
    try {
      mediaFiles = fs.readdirSync(mediaDir)
    } catch (e: any) {
      mediaFiles = [e.message]
    }
    
    try {
      seedFiles = fs.readdirSync(seedDir)
    } catch (e: any) {
      seedFiles = [e.message]
    }
    
    return NextResponse.json({
      cwd: process.cwd(),
      mediaDir,
      seedDir,
      mediaFiles,
      seedFiles
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
