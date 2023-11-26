import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

function ResourceWithContentIcon({ icon: Icon }) {
    return (
        <div
            className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px]",
                "transition duration-300 group-hover:ring-zinc-900/25 dark:ring-white/20 dark:group-hover:ring-primary group-hover:text-primary",
            )}>
            <Icon
                className={cn(
                    "h-8 w-8 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 group-hover:fill-primary",
                    "dark:fill-white/30 dark:stroke-zinc-400 dark:group-hover:fill-primary-300/10 dark:group-hover:stroke-primary",
                )}/>
        </div>
    );
}

export function ResourcePattern({ mouseX, mouseY }) {
    let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };
    
    return (
        <div className="pointer-events-none">
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ffede3] to-[#ffede3] opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-10 dark:from-[#ea580c] dark:to-[#e3956d]"
                style={style}
            />
        </div>
    );
}

export function ResourceWithContent({ children, scrolling = true, bodyClassName, ...resource }) {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
    
    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    
    return (
        <div
            key={resource.name}
            onMouseMove={onMouseMove}
            className="group relative flex rounded-lg bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-card dark:hover:shadow-black/5"
        >
            <ResourcePattern mouseX={mouseX} mouseY={mouseY}/>
            <div
                className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-300 group-hover:ring-slate-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"
            />
            <div className={cn("relative rounded-2xl p-4 w-full", bodyClassName)}>
                {resource.icon && <ResourceWithContentIcon icon={resource.icon}/>}
                {resource.name &&
                    <h3 className="mt-4 text-xl md:text-3xl font-semibold leading-7 text-zinc-900 dark:text-white">
                    {resource.name}
                    </h3>}
                {(!!resource.icon || !!resource.name) && <Separator className="my-4"/>}
                <div className={cn(
                    "w-full resource-with-content-body",
                    {
                        "max-h-64 overflow-y-auto": scrolling,
                    },
                )}>
                    {children}
                </div>
            </div>
        </div>
    );
}