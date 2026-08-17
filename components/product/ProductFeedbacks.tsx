import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProductFeedbacks() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Feedbacks</p>

      {testimonials.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-black/[0.14] bg-white/40 px-5 py-6 text-center text-sm text-ink/55">
          Em breve, depoimentos de clientes por aqui.
        </div>
      ) : (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-[260px] flex-none snap-start rounded-2xl border border-line p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gradient-to-br from-luma-blue via-luma-lilac to-luma-pink text-sm font-semibold text-white">
                  {getInitials(testimonial.name)}
                </div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
              </div>

              {typeof testimonial.rating === "number" ? (
                <div className="mt-3 flex gap-0.5" aria-label={`${testimonial.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className={index < testimonial.rating! ? "fill-luma-yellow text-luma-yellow" : "text-line"}
                    />
                  ))}
                </div>
              ) : null}

              <p className="mt-3 text-sm leading-6 text-ink/68">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
