import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[0.42rem] border border-transparent bg-clip-padding font-mono text-[0.68rem] font-semibold whitespace-nowrap uppercase tracking-[0.18em] transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#00e676] text-black shadow-[0_0_0_1px_rgba(0,230,118,0.12),0_18px_44px_rgba(0,230,118,0.16)] hover:-translate-y-px hover:bg-[#00ff8a] hover:shadow-[0_0_0_1px_rgba(0,255,138,0.2),0_22px_52px_rgba(0,255,138,0.22)]",
        outline:
          "border-white/12 bg-transparent text-[#dcdcdc] hover:border-[#00e676] hover:text-[#00e676] aria-expanded:border-[#00e676] aria-expanded:text-[#00e676]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "text-[#888888] hover:bg-white/[0.04] hover:text-[#00e676] aria-expanded:bg-white/[0.04]",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:border-destructive/40",
        link: "h-auto rounded-none p-0 text-foreground underline underline-offset-8 hover:text-primary",
      },
      size: {
        default: "h-10 px-4",
        xs: "h-7 px-2.5 text-[0.6rem]",
        sm: "h-8 px-3 text-[0.62rem]",
        lg: "h-11 px-5 text-[0.72rem]",
        icon: "size-8",
        "icon-xs": "size-7 rounded-[0.32rem] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-[0.35rem]",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  render,
  nativeButton,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      nativeButton={render ? false : nativeButton}
      render={render}
      {...props}
    />
  )
}

export { Button, buttonVariants }
