import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const verifyPayment = async () => {
    if (!token) return

    try {
      // Detect VNPAY callback: presence of vnp_TxnRef or vnp_SecureHash
      const vnp_TxnRef = searchParams.get('vnp_TxnRef')
      const vnp_SecureHash = searchParams.get('vnp_SecureHash')

      if (vnp_TxnRef || vnp_SecureHash) {
        // Collect all params beginning with vnp_
        const payload = {}
        for (const [key, value] of searchParams.entries()) {
          if (key.startsWith('vnp_')) payload[key] = value
        }
        const res = await axios.post(`${backendUrl}/api/order/verifyVnpay`, payload, { headers: { token } })
        if (res.data.success) {
          setCartItems({})
          navigate('/orders')
        } else {
          navigate('/cart')
        }
        return
      }

      // Fallback: Stripe verify using success/orderId params
      const success = searchParams.get('success')
      const orderId = searchParams.get('orderId')
      if (success !== null && orderId) {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { headers: { token } }
        )
        if (response.data.success) {
          setCartItems({})
          navigate('/orders')
        } else {
          navigate('/cart')
        }
        return
      }

      // If no known params, go home
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      navigate('/cart')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return <div />
}

export default Verify
