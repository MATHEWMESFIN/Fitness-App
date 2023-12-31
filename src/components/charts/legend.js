import { ColorPalette, defineStyleAnatomy } from "./core";
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const LegendAnatomy = defineStyleAnatomy({
    legend: cva(["UI-Legend__legend", "flex flex-wrap overflow-hidden truncate"]),
    legendItem: cva([
        "UI-Legend__legendItem",
        "inline-flex items-center truncate mr-4",
    ]),
    dot: cva([
        "UI-Legend__dot",
        "shrink-0",
        "flex-none h-3 w-3 bg-gray rounded-full shadow-sm mr-2",
    ]),
    label: cva([
        "UI-Legend__label",
        "whitespace-nowrap truncate text-sm font-medium text-gray-700 dark:text-gray-300",
    ]),
});

const LegendItem = ({
                        name,
                        color,
                        dotClassName,
                        legendItemClassName,
                        labelClassName,
                    }) => (
    <li className={cn(LegendAnatomy.legendItem(), legendItemClassName)}>
        <svg
            className={cn(LegendAnatomy.dot(), dotClassName)}
            style={{
                color: `var(--${color})`,
            }}
            fill="currentColor"
            viewBox="0 0 8 8"
        >
            <circle cx={4} cy={4} r={4}/>
        </svg>
        <p className={cn(LegendAnatomy.label(), labelClassName)}>{name}</p>
    </li>
);

export const Legend = React.forwardRef((props, ref) => {
    const {
        categories,
        colors = ColorPalette,
        className,
        legendClassName,
        legendItemClassName,
        labelClassName,
        dotClassName,
        ...rest
    } = props;
    return (
        <ol
            ref={ref}
            className={cn(LegendAnatomy.legend(), legendClassName, className)}
            {...rest}
        >
            {categories.map((category, idx) => (
                <LegendItem
                    key={`item-${idx}`}
                    name={category}
                    color={colors[idx] ?? "brand"}
                    dotClassName={dotClassName}
                    legendItemClassName={legendItemClassName}
                    labelClassName={labelClassName}
                />
            ))}
        </ol>
    );
});

Legend.displayName = "Legend";