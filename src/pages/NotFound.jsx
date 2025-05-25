import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    toast.dismiss()
    toast.error('Сторінку не знайдено')
  }, [])

  return (
    <div className="notfound">
      <Link to="/">Повернутися на головну</Link>
    </div>
  )
}
