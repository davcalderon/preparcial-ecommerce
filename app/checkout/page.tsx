"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useCart } from "../context/CartContext";

const checkoutSchema = z.object({
  fullName: z.string().min(5, "El nombre debe por lo menos 5 caracteres"),
  email: z.string(),
  paymentMethod: z.string().min(1, "metodo de pago"),
  acceptedTerms: z.literal(true, {
    message: "Debe aceptar terminos",
  }),
});

export default function CheckoutPage() {
  const cart = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const formData = { fullName, email, paymentMethod, acceptedTerms };
  const validation = checkoutSchema.safeParse(formData);

  function getError(field: string) {
    if (!touched[field] || validation.success) return null;
    const issue = validation.error.issues.find((i) => i.path[0] === field);
    return issue ? issue.message : null;
  }

  function markTouched(field: string) {
    setTouched({ ...touched, [field]: true });
  }

  const canSubmit =
    validation.success && cart.items.length > 0 && !isSubmitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    cart.clearCart();
    setFullName("");
    setEmail("");
    setPaymentMethod("");
    setAcceptedTerms(false);
    setTouched({});
    setIsSubmitting(false);
    setOrderCompleted(true);
  }

  if (orderCompleted) {
    return (
      <div>
        <h2>Pedido confirmado</h2>
        <Link href="/">Volver al catalogo</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>

      <h3>Resumen</h3>
      {cart.items.length === 0 && <p>El carrito esta vacio</p>}

      {cart.items.map((item) => (
        <div key={item.id}>
          <p>
            {item.title} x {item.quantity} = ${item.price * item.quantity}
          </p>
          <button onClick={() => cart.decreaseQuantity(item.id)}>-</button>
          <button onClick={() => cart.increaseQuantity(item.id)}>+</button>
          <button onClick={() => cart.removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}

      <p>Total: ${cart.totalPrice}</p>

      <h3>Datos</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre completo</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => markTouched("fullName")}
          />
          {getError("fullName") && <p>{getError("fullName")}</p>}
        </div>

        <div>
          <label>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => markTouched("email")}
          />
          {getError("email") && <p>{getError("email")}</p>}
        </div>

        <div>
          <label>Metodo de pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Selecciona</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            Acepto los terminos
          </label>
        </div>

        <button type="submit" disabled={!canSubmit}>
          {"Enviando"}
        </button>
      </form>
    </div>
  );
}
