import { ReactNode } from "react"
// cn函数通常是用来处理css类名的生成
import { cn } from "@/lib/utils"

const MaxWidthWrapper = ({
    className,
    children
}: {
    className?: string
    children: ReactNode
}) => {
    return (
        <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20")}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper