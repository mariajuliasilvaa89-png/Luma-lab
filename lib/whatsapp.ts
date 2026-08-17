import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { CartItem } from "@/types";

export function buildCartMessage(items: CartItem[]) {
  const lines = ["Olá! Vim pelo site da Luma Lab e gostaria de fazer este pedido:", ""];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} (${item.quantity}x)`);
    if (item.color) lines.push(`   Cor: ${item.color}`);
    Object.entries(item.customValues ?? {}).forEach(([label, value]) => {
      if (value) lines.push(`   ${label}: ${value}`);
    });
    lines.push("");
  });

  lines.push("Pode me passar os valores e o prazo, por favor?");

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
