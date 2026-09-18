import { Link, useRouterState } from "@tanstack/react-router";
import { SatelliteHeader, type HeaderLinkProps } from "@tskool/satellite-header";
import { HEADER_GROUPS, HEADER_NAV, HEADER_UTILITIES } from "@/data/header";

function HeaderLink({ href, ...props }: HeaderLinkProps) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return <a href={href} {...props} />;
  }
  return <Link to={href} {...props} />;
}

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <SatelliteHeader
      brand={{ name: "T IGC", suffix: "IGC", caption: "인천글로벌캠퍼스 입시·컨설팅", logoSrc: "/logo.png", homeHref: "/promo" }}
      pathname={pathname}
      groups={HEADER_GROUPS}
      nav={HEADER_NAV}
      utilities={HEADER_UTILITIES}
      LinkComponent={HeaderLink}
    />
  );
}
