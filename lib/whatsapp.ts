import { WHATSAPP_NUMBER } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";
import type { CartItem } from "@/types";

export function buildCartMessage(items: CartItem[]) {
  const lines = [
    "Olá, Luma Lab!",
    "",
    "Gostaria de fazer este pedido:",
    ""
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.quantity}x ${item.name}`);
    if (item.color) lines.push(`Cor: ${item.color}`);
    Object.entries(item.customValues ?? {}).forEach(([label, value]) => {
      if (value) lines.push(`${label}: ${value}`);
    });
    lines.push(`${formatCurrency((item.price ?? 0) * item.quantity)}`);
    lines.push("");
  });

  lines.push(`Subtotal: ${formatCurrency(items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0))}`);
  lines.push("");
  lines.push("Gostaria de finalizar meu pedido.");

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
