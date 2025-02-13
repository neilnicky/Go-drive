import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "~/lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  isCurrent?: boolean
}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ ...props }, ref) => (
  <nav aria-label="breadcrumb" ref={ref} {...props} />
))
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("transition-colors hover:text-foreground font-medium", className)} {...props} />
))
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentPropsWithoutRef<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    &#8230;
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis }

