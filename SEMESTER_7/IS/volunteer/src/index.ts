import 'dotenv/config'
import './db'
import './server'
import path from 'path'
import fs from 'node:fs/promises'

const endpointsPath = path.join(__dirname, 'endpoints')

fs.readdir(endpointsPath)
  .then(fileNames => {
    const importPromises = fileNames.map(f => import(path.join(endpointsPath, f)))
    Promise.all(importPromises)
    console.log('🔌 Endpoints loaded!');
  })


