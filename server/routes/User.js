import express from 'express'
import { getUser } from '../controllers/User.js'

const router = express.Router()

router.get('/', getUser)

router.put('/update', async (req, res) => {})

router.delete('/delete', async (req, res) => {})

export default router