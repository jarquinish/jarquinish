import { ServiceCta } from "./ServiceCta";

type Props = {
  variant: "charla" | "taller" | "consultoria";
  href: string;
  label: string;
  placement: string;
  heading: string;
};

export function InlineCTA({ variant, href, label, placement, heading }: Props) {
  return (
    <div className="border-y border-ink/10 bg-paper px-6 py-12 text-center sm:py-16">
      <p className="mx-auto max-w-2xl text-xl font-medium text-ink sm:text-2xl">{heading}</p>
      <div className="mt-6">
        <ServiceCta variant={variant} href={href} label={label} placement={placement} />
      </div>
    </div>
  );
}
