import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddToCart = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cartItems')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Merge any incoming state into localStorage-backed cart
  useEffect(() => {
    if (state?.product) {
      const incoming = {
        title: state.product.title,
        price: state.product.price,
        image: state.product.image || state.product.images?.[0],
        size: state.size || 'M',
        quantity: state.quantity || 1,
      }
      setItems(prev => {
        const next = [...prev]
        const idx = next.findIndex(i => i.title === incoming.title && i.size === incoming.size)
        if (idx >= 0) {
          next[idx].quantity = (next[idx].quantity || 1) + incoming.quantity
        } else {
          next.push(incoming)
        }
        return next
      })
    }
  }, [state])

  // Persist whenever items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

  const updateQty = (index, delta) => {
    setItems(prev => {
      const next = [...prev]
      next[index].quantity = Math.max(1, (next[index].quantity || 1) + delta)
      return next
    })
  }

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const subtotal = items
    .reduce((sum, i) => sum + (Number(i.price) || 0) * (i.quantity || 1), 0)
    .toFixed(2)

  if (items.length === 0) {
    return (
      <div className="mt-24 px-6">
        <div className="mx-auto max-w-3xl rounded-xl border bg-white p-6 text-center">
          <p className="text-gray-800">Your cart is empty.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Continue shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Your Cart</h1>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 rounded-2xl bg-white border">
            <div className="divide-y">
              {items.map((item, idx) => (
                <div key={`${item.title}-${item.size}`} className="p-4 sm:p-6 flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover bg-gray-50"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-900 font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                      </div>
                      <p className="text-gray-900 font-semibold">Rs. {item.price}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-md border">
                        <button
                          className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => updateQty(idx, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => updateQty(idx, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-sm text-rose-600 hover:text-rose-700"
                        onClick={() => removeItem(idx)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">Rs. 0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">Included</span>
              </div>
            </div>
            <div className="mt-4 border-t pt-4 flex flex-col gap-3">
              <button className="w-full rounded-md bg-indigo-600 text-white py-2.5 hover:bg-indigo-700">
                Checkout
              </button>
              <button
                className="w-full rounded-md border py-2.5 text-gray-900 hover:bg-gray-50"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToCart