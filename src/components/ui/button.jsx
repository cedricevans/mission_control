
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-[var(--primary-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:opacity-90',
				destructive:
          'bg-[var(--accent-red)] text-[var(--text-inverse)] hover:opacity-90',
				outline:
          'border border-[var(--border-color)] bg-transparent hover:bg-[var(--hover-bg)] text-[var(--text-primary)]',
				secondary:
          'bg-[var(--secondary-bg)] text-[var(--text-primary)] hover:opacity-80 border border-[var(--border-color)]',
				ghost: 'hover:bg-[var(--hover-bg)] text-[var(--text-primary)]',
				link: 'text-[var(--accent-blue)] underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };
